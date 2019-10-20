<template>
<div id="map">
    {{dialog}}
    <header-tool-bar />
    <header-search />
    <div id="MapView">
       
    </div>
    <widget-add-karaoke :dialog="dialog" />
</div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'widget-add-karaoke': () => import('@/components/widget/addKaraoke.vue')
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
        
        this.getView.on("click",function(response){
            console.log(response)
        })
      
    }
}
</script>

