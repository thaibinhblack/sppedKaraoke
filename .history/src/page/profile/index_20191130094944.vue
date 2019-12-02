<template>
    <div id="page-profile">
        <div id="header-top">
            <v-container grid-list-xs style="padding-bottom: 0px;">
                <v-row>
                    <v-col cols="12" sm="3" md="2" class="logo">
                        <h2><router-link to="/" style="color:#333;">SPEED KARAOKE</router-link></h2>
                    </v-col>
                    <v-col cols="12" sm="9" md="10">
                        <ul class="info-account">
                            <li>HÔM NAY <br /> {{now}}</li>
                            <li>TÀI KHOẢN CỦA TÔI <br/> {{user.DISPLAY_NAME}} </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" sm="12" style="padding-bottom: 0px;"> 
                        <!-- <v-list vertical="true">
                            <v-list-item to="/profile/bookings">
                                    Thông tin đặt phòng
                            </v-list-item>
                            <v-list-item to="/profile/message">
                                    Tin nhắn
                            </v-list-item>
                            <v-list-item to="/profile/edit-account">
                                    Cài đặt tài khoản
                            </v-list-item>
                        </v-list> -->
                        <ul class="list-option">
                            <li v-if="user.UUID_RULE == 'manager-2019'"><router-link to="/manager-karaoke/dashboard">Trang quản lý</router-link></li>
                            <li><router-link to="/profile/bookings">Đặt chỗ của tôi</router-link></li>
                            <li><router-link to="/profile/message">Tin nhắn</router-link></li>
                            <li><router-link 
                            to="/profile/edit-account">Cài đặt tài khoản</router-link></li>
                        </ul>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div id="main-profile">
            <router-view></router-view>
        </div>
        <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
    data()
    {
        return {
            now: moment(new Date()).format('YYYY/MM/DD'),
            user: {}
            
        }
    },
    computed:{
        ...mapGetters(["getManager"])
    },
    watch:{
        getManager()
        {
            this.ApiCheckToken()
        }
    },
    methods: {
        async ApiCheckToken()
        {
            
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                this.$store.state.ModuleManagerKaraoke.user = response.data
                if(response.data.BIRTH_DAY != null)
                {
                    this.date = response.data.BIRTH_DAY
                }
                // console.log(response.data)
            })
            this.$store.state.loading = false
        },
        
    },
    created()
    {
        console.log('cookie',this.$cookies.get("token"))
        this.ApiCheckToken()
    }
}
</script>
<style>
#header-top {background-color: #fff;}
.info-account,.list-option {text-align: right;width: 100%}
.info-account li,.list-option li {display: inline-block;list-style: none; margin: 0 15px;}
.list-option {text-align: left}
.list-option li {margin: 0 10px;padding-bottom: 10px;}
.list-option li a.router-link-active {border-bottom: 3px #f68a39 solid;padding-bottom: 10px;}
.list-option li a {color: #a3acb9}
.list-option li a.router-link-active,.list-option li a:hover {color: #333;;}
.btn-manager,.btn-avatar {padding: 15px 25px;color: #f68a39;border: 1px solid #eeeeee;background: #fff;outline: none;font-size: 13px}
.btn-avatar {color: #fff;background: #f68a39; margin-left: 15px;}
.myAvatar {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;cursor: pointer;}
label {font-weight: bold}
.list-edit-account {padding: 0;border: 1px solid #e2e2e2;}
.btn-manager:hover {background: #f68a39;color: #fff;}
</style>