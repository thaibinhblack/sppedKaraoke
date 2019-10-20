<template>
<div id="map">
    {{dialog}}
    <header-tool-bar />
    <header-search />
    <div id="MapView">
       
    </div>
    
</div>

</template>

<script>
import {mapActions} from 'vuex'
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
    methods: {
        ...mapActions(["commitInitMap"])
    },
    created()
    {
        this.commitInitMap()
      
    }
}
</script>

<style scoped>
.widget {width: 350px;top: 0;right: 0;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>