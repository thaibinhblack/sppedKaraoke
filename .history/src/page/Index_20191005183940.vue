<template>
    <div id="index">
       <header-tool-bar />
        <header-search />
        <v-container fluid grid-list-xs class="custom">
            <v-row>
                <v-col cols="12" sm="12">
                    <h3>Nghỉ lễ nên đi hát ở đâu?</h3>
                    <span>Lễ này bạn đi đâu, App Karaoke đều giảm sâu đến đó,mức giảm lên tới 25%. Chớp lấy cơ hội, đặt ngay để có chuyến đi tiết kiệm nhất.</span>
                </v-col>

                <!-- <vueper-slides width="100%" class="no-shadow col-sm-12" :visible-slides="3" :slide-ratio="1/4" :dragging-distance="70">
                    <vueper-slide v-for="(karaoke,index) in karaokes" :key="index">
                        
                    </vueper-slide>
                </vueper-slides> -->
                <hooper :settings="hooperSettings">
                    <slide v-for="(karaoke,index) in karaokes" :key="index">
                        <content-event  :karaoke="karaoke"/>
                    </slide>
                </hooper>
                    <!-- <vueper-slides class="no-shadow" :visible-slides="3" slide-multiple :slide-ratio="1/4" :dragging-distance="200" :breakpoints="{ 800: { visibleSlides: 2 } }">
                        <vueper-slide v-for="(karaoke,index) in karaokes" :key="index">
                            <content-event   :karaoke="karaoke"/>
                        </vueper-slide>
                    </vueper-slides> -->
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';

export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'content-event': () => import('@/components/contents/index/ContentEvent.vue'),
        Hooper, Slide
    },
    data()
    {
        return {
            provinces: [
                {id: 1, name: 'HỒ CHÍ MINH'}
            ],
            karaokes: [],
            model: null,
            hooperSettings: {
                itemsToShow: 2,
                centerMode: true
            }
        }
    },
    methods: {
        ApiGetBarKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?page=1').then((response) => {
                this.karaokes = response.data
            })
        },
         next() {
            this.$refs.slick.next();
        },
 
        prev() {
            this.$refs.slick.prev();
        },
    },
    created()
    {
        this.ApiGetBarKaraoke()
    }
}
</script>

<style>
a {text-decoration: none;color: #333 !important;}
.container.custom {padding: 10px 15px;}
.bg-event-karaoke {width: 100%;height: 183px;background-size: cover;background-position: 50%;}
.content-top.title p{font-size: 15px;text-align: justify;line-height: 17px;margin-top: 15px;}
.content-main {text-align: justify}
.content-main:hover p {color: #f65e39;font-size: 16px}
</style>

