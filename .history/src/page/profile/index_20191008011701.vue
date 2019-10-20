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
                        <ul class="list-option">
                            <li><router-link to="/profile/bookings">Đặt chỗ của tôi</router-link></li>
                            <li><router-link to="/profile/message">Tin nhắn</router-link></li>
                            <li class="active"><router-link to="/profile/edit-account">Cài đặt tài khoản</router-link></li>
                        </ul>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div id="main-profile">
            <v-container grid-list-xs>
                <v-row>
                    <v-col cols="12" sm="7" md="6" >
                       <v-list-item two-line>
                           <v-list-item-avatar>
                               <v-avatar
                                   size="70px"
                                   color="#e2e2e2"
                               >
                                   <!-- <img src="src" alt="alt"> -->
                               </v-avatar>
                           </v-list-item-avatar>
                           <v-list-item-content>
                               <v-list-item-title>
                                   <h3>{{user.EMAIL}} - Thông tin tài khoản</h3>
                               </v-list-item-title>
                               <v-list-item-sub style="margin-top:7px;">
                                  <small>Cá nhân hóa tài khoản bằng việc cập nhật thông tin của bạn</small>
                               </v-list-item-sub>
                           </v-list-item-content>
                       </v-list-item>
                    </v-col>
                    <v-col cols="12" sm="5" md="6" style="text-align:right">
                        <button class="btn btn-manager">Trở thành chủ nhà</button>
                    </v-col>
                    <v-col cols="12" sm="5" md="4">
                        <v-list>
                            <v-list-item to="/profile/edit-account/info-account">
                                <v-list-item-title>
                                    Thông tin tài khoản
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item to="/profile/edit-account/password">
                                <v-list-item-title>
                                    Thay đổi mật khẩu
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" sm="7" md="8">
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <v-avatar
                                size="80"
                                color="#e2e2e2"
                                >
                                    <!-- <img src="src" alt="alt"> -->
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <button class="btn btn-avatar"> Đổi ảnh đại diện</button>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <label for="EMAIL">Email</label>
                        <v-text-field
                            name="EMAIL"
                            label="EMAIL"
                            prepend-icon="mdi-email"
                            v-model="user.EMAIL"
                            disabled
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data()
    {
        return {
            now: moment(new Date()).format('YYYY MM DD'),
            user: {}
        }
    },
    methods: {
        async ApiCheckToken()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                // console.log(response.data)
            })
            this.$store.state.loading = false
        }
    },
    created()
    {
        this.ApiCheckToken()
    }
}
</script>
<style scoped>
#header-top {background-color: #fff;}
.info-account,.list-option {text-align: right;width: 100%}
.info-account li,.list-option li {display: inline-block;list-style: none; margin: 0 15px;}
.list-option {text-align: left}
.list-option li {margin: 0 10px;}
.list-option li.active {padding-bottom: 10px;border-bottom: 3px #f68a39 solid}
.list-option li a {color: #a3acb9}
.list-option li.active a,.list-option li a:hover {color: #333;;}
.btn-manager,.btn-avatar {padding: 15px 25px;color: #f68a39;border: 1px solid #eeeeee;background: #fff;outline: none;font-size: 13px}
.btn-avatar {color: #fff;background: #f68a39; margin-left: 15px;}
</style>