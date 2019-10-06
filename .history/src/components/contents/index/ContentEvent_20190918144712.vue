<template>
    <v-container fluid grid-list-xs class="custom">
            <v-row>
                <v-col cols="12" sm="12">
                    <h3>Nghỉ lễ nên đi hát ở đâu?</h3>
                    <span>Lễ này bạn đi đâu, App Karaoke đều giảm sâu đến đó,mức giảm lên tới 25%. Chớp lấy cơ hội, đặt ngay để có chuyến đi tiết kiệm nhất.</span>
                </v-col>
                <v-col cols="12" md="3" v-for="i in 4" :key="i">
                    <a :href="'/karaoke/'+karaoke.URL_SAFE">
                        <div class="bg-event-karaoke" style="background-image:url('../karaoke/karaoke.png')">

                        </div>
                        <div class="content-event-karaoke">
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-avatar
                                        size="50px"
                                        color="#e2e2e2"
                                    >
                                        
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-title>
                                    {{karaoke.NAME_BAR_KARAOKE}}
                                </v-list-item-title>
                            </v-list-item>
                            <div class="content-main" v-html="karaoke.CONTENT_BAR_KARAOKE">
                               
                            </div>
                        </div>
                    </a>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
export default {
    props: ["karaoke"]
}
</script>
