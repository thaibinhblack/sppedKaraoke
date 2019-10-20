<template>
<div id="map">
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
    },
    methods: {
        ...mapActions(["commitInitMap"])
    },
    created()
    {
        this.commitInitMap()
        console.log(this.$route.query)
    }
}
</script>