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
</style>