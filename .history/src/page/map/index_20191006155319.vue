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
    methods: {
        ...mapActions(["commitInitMap"])
    },
    created()
    {
        this.commitInitMap()
    }
}
</script>