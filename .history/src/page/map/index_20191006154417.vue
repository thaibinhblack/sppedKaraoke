<template>
<div id="MapView">

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