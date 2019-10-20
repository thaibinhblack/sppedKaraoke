<template>
<div id="map">
    <header-tool-bar />
    <header-search />
    <v-row class="main-map">
        <v-col cols="12" sm="4" md="3">
            <div class="item-karaoke" v-for="(karaoke,index) in karaokes" :key="index">
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
                           <p>{{karaoke.NAME_BAR_KARAOKE}}</p>
                           <P><v-icon>mdi-map-marker</v-icon> {{karaoke.NAME_PROVINCE}}, {{karaoke.NAME_DISTRICT}}, {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
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
    <v-overlay :value="$store.state.loading" style="color:#fff !important;">
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
            karaokes: []
        }
    },
    computed: {
        ...mapGetters(["getView"])
    },
    watch:{
        getView(newVal)
        {
            if(this.$route.query.UUID_BAR_KARAOKE && newVal != null){
                this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.query.UUID_BAR_KARAOKE).then((response) => {
                    this.commitgetFeature(response.data.OBJECTID)
                })
            }
        }
    },
    methods: {
        ...mapActions(["commitInitMap", "commitgetFeature"]),
        ApiGetKaraokeMap()
        {
            this.$http.get(this.$store.state.API_URL + 'map').then((response) => {
                this.karaokes = response.data
            })
        }
    },
    async created()
    {
        await this.ApiGetKaraokeMap()
        await this.commitInitMap()
        
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
.item-karaoke {padding: 5px 15px;border: 1px solid #e2e2e2;background: #fff;margin-bottom: 10px;}
</style>

