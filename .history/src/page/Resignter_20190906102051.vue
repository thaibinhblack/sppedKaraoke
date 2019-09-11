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
                                    <v-img src="@/asssets/account/coins@2x.png"></v-img>
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