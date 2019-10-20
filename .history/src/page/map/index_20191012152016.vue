<template>
<div id="map">
    <header-tool-bar />
    <header-search />
    <div id="MapView">
        <v-dialog
            v-model="dialog"
            scrollable fullscreen 
            persistent :overlay="false"
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                
            </v-card>
        </v-dialog>
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
        console.log(this.$route.query.karaoke)
    }
}
</script>