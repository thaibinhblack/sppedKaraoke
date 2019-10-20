<template>
<div id="map">
    {{dialog}}
    <header-tool-bar />
    <header-search />
    <div id="MapView">
       
    </div>
    <widget-add-karaoke :dialog="dialog" />
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
        'button-add-karaoke': () => import('@/components/widget/button-add.vue')
    },
    data()
    {
        return {
            dialog: true
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
        if(this.getView != null)
        {
            this.getView.ui.add(button-add-karaoke, "top-left")
            
        }
        
      
    }
}
</script>

