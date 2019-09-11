<template>
    <div id="page-resignter">
        <header-tool-bar />
        <v-row>
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
                                    <p>Tích điểm đối với mỗi lượt đặt chỗ thành công. Quy đổi thành Lux Coin để du lịch nhiều hơn nữa.</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
}
</script>

<style scoped>
.content-group-coin {margin-top: 15px;}
.content-group-coin> label {font-weight: bold}
.content-group-coin p {margin-top: 10px;}
</style>