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
                                    <img v-if="LOGO != null" :src="LOGO" alt="">
                                    <img v-else-if="user.AVATAR != null" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="alt">
                               </v-avatar>
                           </v-list-item-avatar>
                           <v-list-item-content>
                               <v-list-item-title>
                                   <h3>{{user.EMAIL}} - Thông tin tài khoản</h3>
                               </v-list-item-title>
                               <v-list-item-subtitle style="margin-top:7px;">
                                  <small>Cá nhân hóa tài khoản bằng việc cập nhật thông tin của bạn</small>
                               </v-list-item-subtitle>
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
                        <v-form @submit.prevent="updateUser()">
                            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                            <v-list-item two-line style="margin-bottom:25px;">
                                    <v-list-item-avatar>
                                        <v-avatar
                                        size="80"
                                        color="#e2e2e2"
                                        >
                                            <img v-if="LOGO != null" :src="LOGO" alt="">
                                            <img v-else-if="user.AVATAR != null" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="alt">    
                                        </v-avatar>
                                    </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <button class="btn btn-avatar"> Đổi ảnh đại diện</button>
                                        <input type="file" ref="myAvatar" class="myAvatar" @change="renderLogo()">
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
                            <label for="NAME">Họ & Tên</label>
                            <v-text-field
                                name="NAME"
                                label="Họ & Tên"
                                prepend-icon="mdi-account"
                                required
                                v-model="user.DISPLAY_NAME"
                            ></v-text-field>
                            <label for="PHONE">Số điện thoại</label>
                            <v-text-field
                                name="PHONE"
                                label="Họ & Tên"
                                prepend-icon="mdi-phone"
                                required
                                v-model="user.PHONE"
                            ></v-text-field>
                            <label for="ADDRESS">Địa chỉ</label>
                            <v-text-field
                                name="ADDRESS"
                                label="Địa chỉ"
                                prepend-icon="mdi-map-marker"
                                required
                                v-model="user.ADDRESS"
                                required
                            ></v-text-field>
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="dateFormatted"
                                    label="Ngày sinh"
                                    hint="MM/DD/YYYY format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar-range"
                                    @blur="date = parseDate(dateFormatted)"
                                    required
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                            <button type="submit" class="btn btn-add" style="margin-top: 15px;">Cập nhật</button>
                        </v-form>
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
            now: moment(new Date()).format('YYYY/MM/DD'),
            user: null,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            LOGO: null,
            message: {
                type: null,
                text: null
            }
        }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
        renderLogo()
        {
            var reader  = new FileReader()
            const file = this.$refs.myAvatar.files[0]
            this.user.AVATAR = file
            this.LOGO  = URL.createObjectURL(file)
            // console.log(this.LOGO)
            // console.log(this.user.LOGO)
            // console.log(file)
        },

        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        async ApiCheckToken()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                if(response.data.BIRTH_DAY != null)
                {
                    this.date = response.data.BIRTH_DAY
                }
                // console.log(response.data)
            })
            this.$store.state.loading = false
        },
        async updateUser()
        {
            this.$store.state.loading = true
            const data = new FormData()
            data.append("DISPLAY_NAME",this.user.DISPLAY_NAME)
            data.append("PHONE",this.user.PHONE)
            data.append("ADDRESS",this.user.ADDRESS)
            data.append("BIRTH_DAY",this.date)
            if(this.LOGO != null)
            {
                data.append("AVATAR",this.user.AVATAR)
            }
            await this.$http.post(this.$store.state.API_URL + 'user/'+this.user.UUID_USER+'/update?api_token='+this.$session.get('token'),data)
            .then((response) => {
                if(response.data.success == true)
                {
                    this.message.type = 'success'
                    this.message.text = response.data.message
                }
                else
                {
                    this.message.type = 'warning'
                    this.message.text = response.data.message
                }
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
.myAvatar {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;cursor: pointer;}
label {font-weight: bold}
</style>