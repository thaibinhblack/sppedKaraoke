<template>
    <div id="page-add-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="4">
                THÊM NHÂN VIÊN QUẢN LÝ
            </v-col>
            <v-col cols="12" sm="8" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link to="/manager-karaoke/users"> Danh sách nhân viên</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>Thêm mới</li>
                </ul>
            </v-col>
            <v-col class="12" sm="12">
                <v-tabs>
                    <v-tab>
                        Thêm thành viên mới
                    </v-tab>
                    <v-tab>
                        Tìm kiếm
                    </v-tab>
                    <v-tab-item>
                         <v-form @submit.prevent="createUser()" >
                            <v-card>
                            
                                <v-card-title primary-title>
                                    <span class="title-label" style="font-size: 15px;">Thêm nhân viên mới mới {{user.DISPLAY_NAME}}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                        {{message.text}}
                                    </v-alert>
                                    <v-row>
                                        <v-col cols="12" sm="12" class="group-logo-karaoke">
                                            <v-avatar
                                                size="150"
                                                color="#e2e2e2"
                                                class="logo-karaoke">
                                                <input type="file" ref="MyAvatar" class="input-logo" @change="renderLogo()"> 
                                                <img v-if="LOGO != null" :src="LOGO" alt="alt">
                                            </v-avatar>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-text-field
                                                name="EMAIL"
                                                label="Email"
                                                prepend-icon="mdi-email"
                                                placeholder="Nhập email"
                                                required
                                                :counter="50"
                                                :error="user.error_email"
                                                :error-messages="user.message_email_error"
                                                :success="user.succes_email"
                                                :success-messages="user.message_email_success"
                                                @change="checkMail()"
                                                v-model="user.EMAIL"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-text-field
                                                name="PASSWORD"
                                                label="Password"
                                                placeholder="Nhập password"
                                                prepend-icon="mdi-key"
                                                type="password"
                                                required
                                                v-model="user.PASSWORD"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-text-field
                                                name="DISPLAY_NAME"
                                                label="Họ & Tên"
                                                prepend-icon="mdi-account"
                                                placeholder="Nhập họ & tên"
                                                required
                                                :counter="50"
                                                v-model="user.DISPLAY_NAME"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-text-field
                                                name="PHONE"
                                                label="SDT"
                                                placeholder="Nhập số điện thoại"
                                                prepend-icon="mdi-phone"
                                                required
                                                v-model="user.PHONE"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-text-field
                                                name="ADDERSS"
                                                label="Địa chỉ"
                                                placeholder="Nhập địa chỉ"
                                                prepend-icon="mdi-map-marker"
                                                required
                                                v-model="user.ADDRESS"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="12" sm="4">
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
                                        </v-col>
                                        
                                        <v-col class="12" sm="4">
                                            <v-select
                                                :items="GENDER"
                                                item-value="value"
                                                item-text="text"
                                                v-model="user.GENDER"
                                                prepend-icon="mdi-gender-male-female"
                                                label="Giới tính"
                                            ></v-select>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-select
                                                :items="rules"
                                                item-value="UUID_RULE"
                                                item-text="NAME_RULE"
                                                v-model="user.UUID_RULE"
                                                prepend-icon="mdi-key"
                                                label="Quyền"
                                            ></v-select>
                                        </v-col>
                                        <v-col class="12" sm="4">
                                            <v-select
                                                :items="karaokes"
                                                item-value="UUID_BAR_KARAOKE"
                                                item-text="NAME_BAR_KARAOKE"
                                                v-model="user.UUID_BAR_KARAOKE"
                                                prepend-icon="mdi-store"
                                                label="Thuộc chi nhánh"
                                            ></v-select>
                                        </v-col>
                                        
                                    </v-row>
                                
                                </v-card-text>
                                <v-card-actions>
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <button class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item>
                        <form action="">
                            <v-row>
                                <v-col>
                                    
                                </v-col>
                            </v-row>
                        </form>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import uuid from 'uuid'
import UrlSafeString from 'url-safe-string'
import { mapGetters } from 'vuex'

export default {

    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      avatar: null,
      GENDER: [
          {text: 'NAM', value: 1},
          {text: 'NỮ', value: 0}
      ],
       user: {
           error_email: false,
           message_email_error: '',
           succes_email: false,
           message_email_success: '',
           GENDER: 1,
           EMAIL: '',
           PASSWORD: ''
        },
        message: {
            type: null,
            text: null
        },
        LOGO: null,
        rules: [],
        karaokes: []
     
    }),
    computed: {
      ...mapGetters(["getUser"]),
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
     watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods:{
        renderLogo()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            this.user.AVATAR = file
            this.LOGO  = URL.createObjectURL(file)
            // console.log(this.user.LOGO)
            // console.log(file)
        },

        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        createUser()
        {
            if(this.LOGO == null || this.user.EMAIL == '' || this.user.PASSWORD == '' )
            {
                this.message.type = 'warning'
                if(this.LOGO == null)
                {
                    this.message.text = 'Bạn chưa thêm logo cho người dùng'
                }
                else if(this.user.EMAIL == '')
                {
                    this.message.text = 'Bạn chưa nhập EMAIL'
                }
                else
                {
                    this.message.text = 'Bạn chưa mật khẩu'
                }
            }
            else
            {
                const data = new FormData()
                data.append("AVATAR",this.user.AVATAR)
                data.append("EMAIL",this.user.EMAIL)
                data.append("PASSWORD",this.user.PASSWORD)
                data.append("DISPLAY_NAME",this.user.DISPLAY_NAME)
                data.append("PHONE",this.user.PHONE)
                data.append("ADDRESS",this.user.ADDRESS)
                data.append("BIRTH_DAY",this.date)
                data.append("GENDER",this.user.GENDER)
                data.append("UUID_RULE",this.user.UUID_RULE)
                data.append("UUID_BAR_KARAOKE",this.user.UUID_BAR_KARAOKE)
                this.$http.post(this.$store.state.API_URL + 'user_manageer?api_token='+this.$cookies.get('token'),data).then((response) => {
                    console.log(response.data)
                    this.message.type = "success"
                    this.message.text = "Thêm nhân viên mới thành công!"
                    this.user =  {
                        error_email: false,
                        message_email_error: '',
                        succes_email: false,
                        message_email_success: '',
                        GENDER: 1,
                        EMAIL: '',
                        PASSWORD: ''
                        }
                    this.LOGO = null
                }).catch(() => {
                    this.message.type = 'warning'
                    this.message.text = "Lôi! xin vui lòng thử lại!"
                })
            }
        },
        ApiGetRule()
        {
            this.$http.get(this.$store.state.API_URL + 'rule?api_token='+this.$cookies.get('token')).then((response) => {
                this.rules = response.data
                this.user.UUID_RULE = response.data[0].UUID_RULE
            })
        },
        ApiGetKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?api_token='+this.$cookies.get('token')).then((response) => {
                    this.karaokes = response.data
                    this.user.UUID_BAR_KARAOKE = response.data[0].UUID_BAR_KARAOKE
                })
        },
        checkMail()
        {
            this.$http.get(this.$store.state.API_URL + 'user?check_email='+this.user.EMAIL)
            .then((response) => {
                if(response.data == true)
                {
                    this.user.error_email = true
                    this.user.succes_email = false
                    this.user.message_email_success = ''
                    this.user.message_email_error = 'Email đã tổn tại!'
                }
                else
                {
                    this.user.error_email = false
                    this.user.succes_email = true
                    this.user.message_email_success = 'Email này có thể đăng ký'
                    this.user.message_email_error = ''
                }
            })
        }
    },
    created()
    {
        this.ApiGetRule()
        this.ApiGetKaraoke()
    }
}
</script>

<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 0;z-index: 999;width: 100%;height: 100%;}
</style>