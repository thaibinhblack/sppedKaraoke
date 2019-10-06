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
                <slider class="row" animation="fade" width="100%">
                    <slider-item
                       v-for="(karaoke,index) in karaokes" :key="index"
                    >
                        <content-event   :karaoke="karaoke"/>
                    </slider-item>
                </slider>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'content-event': () => import('@/components/contents/index/ContentEvent.vue'),
        Slider, SliderItem
    },
    data()
    {
        return {
            provinces: [
                {id: 1, name: 'HỒ CHÍ MINH'}
            ],
            karaokes: [],
            model: null,
             slickOptions: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                autoplay: true,
                autoplaySpeed: 1000,
            },
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

