<template>
<div id="detail-room">
    <header-tool-bar />
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12">
                
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
    },
}
</script>