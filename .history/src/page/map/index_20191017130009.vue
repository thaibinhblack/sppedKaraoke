<template>
<div id="map">
    <header-tool-bar />
    <header-search />
    <v-row class="main-map">
        <v-col cols="12" sm="5" md="4">
            <div class="item-karaoke">
                <v-row>
                    <v-col cols="12" sm="4" md="3">
                        
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="12" sm="7" md="8">
            <div id="MapView">
        
            </div>
        </v-col>
         <button class="btn btn-add-karaoke" @click="province = !province"><v-icon size="16px">mdi-map-marker</v-icon></button>
    </v-row>
    
    <!-- <button class="btn btn-add-karaoke" @click="dialog = !dialog"><v-icon size="16px">mdi-pencil</v-icon></button> -->
    <widget-add-karaoke :dialog="dialog" @closeDialog="dialog = $event" />
    <widget-add-province :dialog="province" />
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
            province: false
        }
    },
    computed: {
        ...mapGetters(["getView"])
    },
    methods: {
        ...mapActions(["commitInitMap"])
    },
    async created()
    {
        await this.commitInitMap()
        this.dialog = this.$route.query.karaoke
      
    }
}
</script>

<style scoped>
#MapView {position: relative;}
.btn-add-karaoke {position: absolute;top: 186px;z-index: 999; outline: none;
left: 60px;width: 31px;height: 31px;border: 1px solid #e2e2e2;background: #fff;}
.main-map {height: calc(100% - 172px);}
</style>

