<template>
    <div id="page-resignter">
        <header-tool-bar />
        <v-row>
            <v-container grid-list-xs>
                <h4></h4>
            </v-container>
        </v-row>
    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
}
</script>