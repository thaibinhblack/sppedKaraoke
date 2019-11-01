<template>
    <div id="index">
       <header-tool-bar />
        <header-search />
        <v-container fluid grid-list-xs class="custom">
            <v-row>
                 <v-col cols="12" sm="12">
                    <h3>Hôm nay có khuyến mãi gì?</h3>
                    <span>Chỉ có tại speed karaoke, book ngay để được ưu đãi hấp dẫn!</span>
                </v-col>
                <hooper  height="180px" :settings="hooperPrômtion" :itemsToShow="3">
                        <slide height="180px" v-for="(promotion,index) in promotions" :key="index">
                           <div class="item-karaoke-province">
                               <div class="image-karaoke-province">
                                   <router-link :to="'/promotion?UUID_PROMOTION='+promotion.UUID_PROMOTION"> 
                                   <v-img height="180px" :src="$store.state.PUBLIC_URL + promotion.BANNER_PROMOTION"></v-img></router-link>
                               </div>
                           </div>
                        </slide>
                </hooper>
                <v-col cols="12" sm="12">
                    <h3>Bạn muốn tìm kiếm các chi nhánh gần đây?</h3>
                    <span>Danh sách chi nhánh của tỉnh <strong>{{karaokeGPSs[0].NAME_PROVINCE}}</strong></span>
                </v-col>
                <hooper class="slider" height="365px" :settings="hooperSettings">
                    <slide v-for="(karaoke,index) in karaokeGPSs" :key="index">
                        <content-event  :karaoke="karaoke"/>
                    </slide>
                </hooper>
                <v-col cols="12" sm="12">
                    <h3>Địa điểm nổi bật?</h3>
                    <span>Cùng speed karaoke nắm bắt những giây phút vui vẻ!</span>
                </v-col>
                <hooper class="slider" height="365px" :settings="hooperSettings">
                        <slide height="365px" v-for="(karaoke,index) in karaoke_province" :key="index">
                           <div class="item-karaoke-province">
                               <div class="image-karaoke-province">
                                   <router-link :to="'/karaoke?ID_PROVINCE='+karaoke.ID_PROVINCE"> <v-img height="300px" :src="$store.state.PUBLIC_URL + karaoke.IMAGE_PROVINCE"></v-img></router-link>
                               </div>
                               <div class="content-karaoke-province">
                                   <p class="title">{{karaoke.NAME_PROVINCE}}</p>
                                   <span>{{karaoke.total}} địa điểm karaoke</span>
                               </div>
                           </div>
                        </slide>
                </hooper>
                <v-col cols="12" sm="12">
                    <h3><strong>Top 10 địa điểm karaoke nổi bật?</strong></h3>
                    <span>Cùng speed karaoke khám phá ngay!</span>
                </v-col>
                <hooper class="slider" height="365px" :settings="hooperSettings">
                    <slide v-for="(karaoke,index) in karaoke_top100" :key="index">
                        <content-event  :karaoke="karaoke"/>
                    </slide>
                </hooper>
                <v-col cols="12" sm="12">
                    <h3><strong>Bạn muốn trãi nghiệm các địa điểm karaoke mới?</strong></h3>
                    <span>Danh sách các địa điểm karaoke mới nhất</span>
                </v-col>
                <hooper class="slider" height="365px" :settings="hooperSettings">
                    <slide v-for="(karaoke,index) in karaokes" :key="index">
                        <content-event  :karaoke="karaoke"/>
                    </slide>
                </hooper>
            </v-row>
        </v-container>
         <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
        <chat />
    </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';

export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'content-event': () => import('@/components/contents/index/ContentEvent.vue'),
        'Chat': () => import('@/components/chat/chat.vue'),
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
                itemsToShow: 5,
                centerMode: true,
                breakpoints: {
                991:
                {
                    centerMode: false,
                    itemsToShow: 5
                },
                765: {
                    centerMode: false,
                    itemsToShow: 3
                },
                564: {
                    itemsToShow: 2,
                    pagination: 'fraction'
                }
                }
            },
             hooperPrômtion: {
                itemsToShow: 3,
                centerMode: true,
                breakpoints: {
                991:
                {
                    centerMode: false,
                    itemsToShow: 3
                },
                765: {
                    centerMode: false,
                    itemsToShow: 2
                },
                564: {
                    itemsToShow: 1,
                    pagination: 'fraction'
                }
                }
            },
             karaoke_province: [],
             promotions: [],
             karaokeGPSs: [],
             karaoke_top100: []
        }
       
    },
    methods: {
        async ApiGetBarKaraoke()
        {
            this.$store.state.loading = await true
            await this.$http.get(this.$store.state.API_URL + 'karaoke?page=1').then((response) => {
                this.karaokes = response.data
            })
            await this.$http.get(this.$store.state.API_URL + 'karaoke?sort=groupby').then((response) => {
                this.karaoke_province = response.data
            })
            await this.$http.get(this.$store.state.API_URL + 'karaoke').then((response) => {
                this.karaoke_top100 = response.data
            })
            this.$store.state.loading = await false
        },
         next() {
            this.$refs.slick.next();
        },
 
        prev() {
            this.$refs.slick.prev();
        },
        ApiPromotion()
        {
            this.$http.get(this.$store.state.API_URL + 'promotion').then((response) => {
                this.promotions = response.data
            })
        },
        GPS()
        {
            this.$getLocation({
                enableHighAccuracy: true, //defaults to false
                timeout: Infinity, //defaults to Infinity
                maximumAge: 0 //defaults to 0
            })
            .then(coordinates => {
                console.log(coordinates)
                this.$http.get('https://api.opencagedata.com/geocode/v1/json?q='+coordinates.lat+'+'+coordinates.lng+'&key=2d3fed69d9404855bf934ad52e5c1d65&pretty=1')
                .then((response) => {
                    const search = new FormData()
                    console.log(response.data.results[0])
                    search.append("search",response.data.results[0].components.county)
                    this.$http.post(this.$store.state.API_URL + 'province/search',search).then((response) => {
                        this.karaokeGPSs= response.data
                        console.log(response.data)
                    })
                    
                })
                
            });
        }
    },
    async created()
    {
        this.$store.state.loading = await true
        this.GPS()
        await this.ApiPromotion()
        await this.ApiGetBarKaraoke()
        this.$store.state.loading = await false
        
        
    }
}
</script>

<style>
#index {background: #ebebeb;}
a {text-decoration: none;color: #333 !important;}
.container.custom {padding: 10px 15px;}
.bg-event-karaoke {width: 100%;height: 183px;background-size: cover;background-position: 50%;}
.content-top.title p{font-size: 15px;text-align: justify;line-height: 17px;margin-top: 15px;}
.content-main {text-align: justify}
.content-main:hover p {color: #f65e39;font-size: 16px}
.slider {height: 375px !important;outline: none;}
.item-karaoke-province {position: relative;padding: 7px;}
.content-karaoke-province {position: absolute;bottom: 0;left: 0;width: 100%;padding: 15px}
.content-karaoke-province * {color: #fff;margin: 0 !important}
</style>

