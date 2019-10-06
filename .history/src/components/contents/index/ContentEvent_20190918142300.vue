<template>
    <v-container fluid grid-list-xs class="custom">
            <v-row>
                <v-col cols="12" sm="12">
                    <h3>Nghỉ lễ nên đi hát ở đâu?</h3>
                    <span>Lễ này bạn đi đâu, App Karaoke đều giảm sâu đến đó,mức giảm lên tới 25%. Chớp lấy cơ hội, đặt ngay để có chuyến đi tiết kiệm nhất.</span>
                </v-col>
                <v-col cols="12" md="3" v-for="i in 4" :key="i">
                    <a href="">
                        <div class="bg-event-karaoke" style="background-image:url('../karaoke/karaoke.png')">

                        </div>
                        <div class="content-event-karaoke">
                            <div class="content-top title">
                                <p>2/9 TP. Hồ Chí Minh, còn homestay siêu khuyến mãi!</p>
                            </div>
                            <div class="content-main">
                                <p>Checkin TP. Hồ Chí Minh, bắt trọn khoảnh khắc Quốc Khánh nghìn like! Săn ngay homestay GIÁ TỐT NHẤT NĂM giảm tới 25%. Nhập ngay mã QK25.</p>
                            </div>
                        </div>
                    </a>
                </v-col>
            </v-row>
        </v-container>
</template>
