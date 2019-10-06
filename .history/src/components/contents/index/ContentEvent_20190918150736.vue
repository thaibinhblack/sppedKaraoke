<template>
    <v-container fluid grid-list-xs class="custom">
            <v-row>
                <v-col cols="12" sm="12">
                    <h3>Nghỉ lễ nên đi hát ở đâu?</h3>
                    <span>Lễ này bạn đi đâu, App Karaoke đều giảm sâu đến đó,mức giảm lên tới 25%. Chớp lấy cơ hội, đặt ngay để có chuyến đi tiết kiệm nhất.</span>
                </v-col>
                <v-col cols="12" md="3" v-for="i in 4" :key="i">
                    <a :href="'/karaoke/'+karaoke.URL_SAFE">
                        <v-slide-group
                        v-model="model"
                        class="pa-4"
                        show-arrows
                        >
                        <v-slide-item
                            v-for="(image,index) in images"
                            :key="index"
                            v-slot:default="{ active, toggle }"
                        >
                            <v-card
                                :color="active ? 'primary' : 'grey lighten-1'"
                                class="ma-12"
                                height="auto"
                                width="100"
                                @click="toggle"
                                >
                                <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                            </v-card>
                        </v-slide-item>
                        </v-slide-group>
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
    props: ["karaoke"],
    data(){
        return {
            images: [],
             model: null,
        }
    },
    methods: {
        ApiGetImageKaraoke()
        {
             this.$http.get(this.$store.state.API_URL +'image/'+this.karaoke.UUID_BAR_KARAOKE+'?type=UUID_BAR_KARAOKE').then((response) => {
                    this.images = response.data
                })
        }
    },
    created()
    {
        this.ApiGetImageKaraoke()
    }
}
</script>
