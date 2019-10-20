<template>
    <div id="page-karaoke">
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                    <ul class="list-link">
                        <li>{{karaoke.NAME_PROVINCE}}</li>
                        <li><v-icon>mdi-chevron-right</v-icon></li>
                        <li><router-link :to="'/karaoke?ID_DISTRICT='+karaoke.ID_DISTRICT">{{karaoke.NAME_DISTRICT}}</router-link></li>
                        <li><v-icon>mdi-chevron-right</v-icon></li>
                        <li>{{karaoke.ADDRESS_BAR_KARAOKE}}</li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
    },
}
</script>