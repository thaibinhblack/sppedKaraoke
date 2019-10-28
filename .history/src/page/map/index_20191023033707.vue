<template>
<div id="map">
    {{$store.state.loading}}
    <header-tool-bar />
    <header-search />
    <v-row class="main-map">
        <v-col cols="12" sm="4" md="3">
            <div class="item-karaoke" v-for="(karaoke,index) in getkaraokes" :key="index" >
                <v-icon class="icon-active" :class="{active: getActive(karaoke.OBJECTID)}">mdi-checkbox-marked</v-icon>
                <v-row>
                   <v-list-item two-line>
                       <v-list-item-avatar>
                            <v-avatar
                            size="70px"
                            color="#e2e2e2"
                            >
                                <img v-if="karaoke.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
                            </v-avatar>
                       </v-list-item-avatar>
                       <v-list-item-content>
                           <p><strong>{{karaoke.NAME_BAR_KARAOKE}}</strong></p>
                           <P class="text-map goto" @click="goTo(karaoke)"><v-icon>mdi-map-marker</v-icon> {{karaoke.NAME_PROVINCE}}, {{karaoke.NAME_DISTRICT}}, {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
                           <p><v-icon color="yellow" size="12" v-for="i in karaoke.STAR_RATING" :key="i">mdi-star</v-icon></p>
                           <p class="text-map"><router-link :to="'/karaoke/'+karaoke.URL_SAFE">Xem chi tiết</router-link></p>
                       </v-list-item-content>
                   </v-list-item>
                </v-row>
            </div>
        </v-col>
        <v-col cols="12" sm="8" md="9" style="position:relative;">
            <div id="MapView">
        
            </div>
            <button class="btn btn-add-karaoke btn-add-province" @click="province = !province"><v-icon size="16px">mdi-map-marker</v-icon></button>
            <button class="btn btn-add-karaoke" @click="dialog = !dialog"><v-icon size="16px">mdi-pencil</v-icon></button>
        </v-col>
        
    </v-row>
    
    <!-- <button class="btn btn-add-karaoke" @click="dialog = !dialog"><v-icon size="16px">mdi-pencil</v-icon></button> -->
    <widget-add-karaoke :dialog="dialog" @closeDialog="dialog = $event" />
    <widget-add-province  :dialog="province" />
    <v-overlay v-if="$store.state.loading == true" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
</div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'widget-add-karaoke': () => import('@/components/widget/addKaraoke.vue'),
        'widget-add-province': () => import('@/components/widget/addProvince.vue')
    },
    data()
    {
        return {
            dialog: false,
            province: false,
        }
    },
    computed: {
        ...mapGetters(["getView","getObjectid", "getkaraokes"]),
        
    },
    watch:{
        getView(newVal)
        {
            if(this.$route.query.UUID_BAR_KARAOKE && newVal != null){
                this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.query.UUID_BAR_KARAOKE).then((response) => {
                    this.commitgetFeature(response.data.OBJECTID)
                })
            }
        },
        getkaraokes(newVal) {
            console.log(newVal)
        }
    },
    methods: {
        ...mapActions(["commitInitMap", "commitgetFeature"]),
        asyc ApiGetKaraokeMap()
        {
            this.$store.state.loading = await true
            await this.$http.get(this.$store.state.API_URL + 'map').then((response) => {
                this.$store.state.karaokeModule.karaokes = response.data
                this.$store.state.karaokeModule.karaokes_tmp = response.data
            })
            this.$store.state.loading = await false
        },
        goTo(karaoke)
        {
             this.commitgetFeature(karaoke.OBJECTID)
        },
        getActive(objectid)
        {
            return objectid == this.getObjectid
        }
    },
    async created()
    {
        
        await this.ApiGetKaraokeMap()
        await this.commitInitMap()
        this.$nextTick(() => {
            this.$store.state.loading = false
        })
        
    }
}
</script>

<style>
#MapView {position: relative;}
.btn-add-karaoke {position: absolute;top: 27px;z-index: 999; outline: none;
left: 70px;width: 31px;height: 31px;border: 1px solid #e2e2e2;background: #fff;}
.btn-add-province {top: 59px;}
.main-map {height: calc(100% - 172px);}
.widget {width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
.item-karaoke {padding: 5px 15px;border: 1px solid #e2e2e2;background: #fff;margin-bottom: 10px;position: relative;}
.text-map {font-size: 13px;}
.goto:hover {color: #f65e39; cursor: pointer;}
.icon-active {position: absolute;right: 0;top: 0px;z-index: 999;background: #fff;color: #f65e39 !important;opacity: 0;}
.icon-active.active{opacity: 1 !important;}
</style>

