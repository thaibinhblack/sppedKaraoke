<template>
    <div id="page-resignter">
        <header-tool-bar />
        <v-row class="bg-header-top">
            <v-container grid-list-xs>
                <h4>Đăng ký thành viên SPEED KARAOKE - Tích điểm thưởng và nhận ưu đãi</h4>
                <p>Nhanh chóng, tiện lợi và an toàn. Đăng ký liền tay, rinh ngay quyền lợi.</p>
            </v-container>
        </v-row>
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="12" md="8">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <div class="group-coin">
                                <div class="image-group-co">
                                    <v-img width="75px" src="@/assets/account/coins@2x.png"></v-img>
                                </div>
                                <div class="content-group-coin">
                                    <label for="Tích điểm nhanh chóng">Tích điểm nhanh chóng</label>
                                    <p>Tích điểm đối với mỗi lượt đặt chỗ thành công. Quy đổi thành Lux Coin để du lịch nhiều hơn nữa.</p>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <div class="group-coin">
                                <div class="image-group-co">
                                    <v-img width="75px" src="@/assets/account/top-sales@2x.png"></v-img>
                                </div>
                                <div class="content-group-coin">
                                    <label for="Tích điểm nhanh chóng">Tiện ích thông minh</label>
                                    <p>Check-in và kiểm tra hóa đơn thanh toán kể cả khi không có kết nối mạng. Hoàn tiền nhanh gọn. Đổi lịch dễ dàng..</p>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <div class="group-coin">
                                <div class="image-group-co">
                                    <v-img width="75px" src="@/assets/account/wallet@2x.png"></v-img>
                                </div>
                                <div class="content-group-coin">
                                    <label for="Tích điểm nhanh chóng">Thanh toán đơn giản</label>
                                    <p>Phương thức thanh toán tiện lợi, an toàn. Tích hợp chức năng lưu thẻ để đặt phòng lần sau.</p>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <div class="group-coin">
                                <div class="image-group-co">
                                    <v-img width="75px" src="@/assets/account/backpack@2x.png"></v-img>
                                </div>
                                <div class="content-group-coin">
                                    <label for="Tích điểm nhanh chóng">Ưu đãi mỗi ngày</label>
                                    <p>Nhận thông báo ưu đãi từ Luxstay khi có kế hoạch du lịch để lựa chọn và đặt ngay cho mình một chỗ ở phù hợp, tiện nghi với giá tốt nhất.</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="4" style="position:relative;">
                    <v-form class="form-resigner" @submit.prevent="createUser()">
                        <v-card style="padding: 15px;border-radius:25px">
                            <v-card-title primary-title>
                                <span style="font-size: 17px;;" class="title-label">Đăng ký thành viên</span>
                                <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                    {{message.text}}
                                </v-alert>
                            </v-card-title>
                            <v-card-text style="margin-top:25px;">
                                <label for="EMAIL" class="title-label">Địa chỉ email</label>
                                <v-text-field
                                    name="EMAIL"
                                    label="EMAIL"
                                    placeholder="Nhập địa chỉ email"
                                    :error="user.ERROR_EMAIL"
                                    :error-messages="user.ERROR_MESSAGE_EMAIL"
                                    v-model="user.EMAIL"
                                    required
                                    append-icon="mdi-email"
                                ></v-text-field>
                                <label for="PHONE" class="title-label">Số điện thoại</label>
                                <v-text-field
                                    name="PHONE"
                                    label="PHONE"
                                    placeholder="Nhập số điện thoại"
                                    v-model="user.PHONE"
                                    :counter="12"
                                    append-icon="mdi-phone"
                                    required
                                ></v-text-field>
                                 <label for="DISPLAY_NAME" class="title-label">Họ & Tên</label>
                                <v-text-field
                                    name="DISPLAY_NAME"
                                    label="Họ & Tên"
                                    placeholder="Nhập họ & tên"
                                    v-model="user.DISPLAY_NAME"
                                    append-icon="mdi-account-card-details-outline"
                                    required
                                ></v-text-field>
                                
                                <label for="PASSWORD" class="title-label">Mật khẩu</label> <small> (ít nhất 8 ký tự)</small>
                                <v-text-field
                                    name="PASSWORD"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    v-model="user.PASSWORD"
                                    append-icon="mdi-lock-question"
                                    required
                                ></v-text-field>
                                <label for="VERIRY_PASSWORD" class="title-label">Xác nhận mật khẩu</label>
                                <v-text-field
                                    name="VERIRY_PASSWORD"
                                    label="Xác nhận mật khẩu"
                                    placeholder="Nhập họ & tên"
                                    v-model="user.VERIRY_PASSWORD"
                                    append-icon="mdi-lock-question"
                                    required
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-row>
                                    <v-col cols="12" sm="12" style="text-align:center;">
                                        <button class="btn-add btn-resignter" type="submit">Đăng ký</button>
                                        <p class="sub-bottom">Bạn đã có tài khoản Luxstay? <a href="/login">Đăng nhập</a></p>
                                    </v-col>
                                </v-row>
                                
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
         <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
    data()
    {
        return {
            user: {},
            message: {
                type: null,
                text: null
            }
        }
    },
    methods:{
        async createUser()
        {   
            this.$store.state.loading = true
            const data = new FormData()
            data.append("EMAIL",this.user.EMAIL)
            data.append("PASSWORD",this.user.PASSWORD)
            data.append("PHONE",this.user.PHONE)
            await this.$http.post(this.$store.state.API_URL + 'resignter',data).then((response) => {
                if(response.data.success == false)
                {
                    this.message.type = 'warning'
                    this.message.text = response.data.message
                }
                else
                {
                    this.$session.start()
                this.$session.set("token",response.data.data)
                this.$router.back()
                }
                
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lỗi! xin vui lòng thử lại!'
            })
            this.$store.state.loading = false
        }
    }
}
</script>

<style scoped>
#page-resignter {background: #fff;}
.content-group-coin {margin-top: 15px;}
.content-group-coin> label {font-weight: bold}
.content-group-coin p {margin-top: 10px;}
.title-label {font-weight: bold}
.btn-resignter {width: 100%;padding: 15px 0;border-radius: 25px;background: #f65e39;color: #fff;font-weight: bold;outline: none}
.sub-bottom {margin-top: 15px;}
.sub-bottom a {color: #f65e39}
.bg-header-top {padding: 25px 0;background: linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)}
.bg-header-top h4 {font-size: 22px;font-weight: bold;color: #fff;}
.bg-header-top p {color: #fff;margin-top: 15px;}
.form-resigner {position: absolute;top:-110px;width:100%;}
</style>