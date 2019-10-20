<template>
<div id="map">
    <header-tool-bar />
    <header-search />
    <div id="MapView">
       
    </div>
    <v-dialog
        v-model="dialog"
        scrollable 
        hide-overlay
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
        class="widget"
    >
    <v-card>
        <v-card-title primary-title>
            Thêm địa chỉ trên bản đồ
        </v-card-title>

    </v-card>
        
    </v-dialog>
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
      
    }
}
</script>