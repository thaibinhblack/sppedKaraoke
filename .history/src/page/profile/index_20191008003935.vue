<template>
    <div id="page-profile">
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="3" md="2" class="logo">
                    <h2><router-link to="/" style="color:#333;">SPEED KARAOKE</router-link></h2>
                </v-col>
                <v-col cols="12" sm="9" md="10">
                    <ul>
                        <li>HÔM NAY</li>
                        <li>TÀI KHOẢN CỦA TÔI</li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
}
</script>