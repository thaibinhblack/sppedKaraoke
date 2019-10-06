<template>
<div id="detail-karaoke">
    <header-tool-bar />
    <div class="banner-karaoke">
        <v-img :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" width="100%" height="350px" aspect-ratio="1.7"></v-img>
    </div>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                <ul class="list-link">
                    <li>{{karaoke.NAME_PROVINCE}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.NAME_DISTRICT}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.ADDRESS_BAR_KARAOKE}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="7" md="8">
                <h2 class="name-karaoke">{{karaoke.NAME_BAR_KARAOKE}}</h2>
                <p><v-icon>mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</p>
                <p class="content" v-html="karaoke.CONTENT_BAR_KARAOKE"></p>
            </v-col>
            <v-col cols="12" sm="5" md="4"></v-col>
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
    data()
    {
        return {
            karaoke: {}
        }
    },
    methods:{
        ApiDetailKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.saleurl).then((response) => {
                this.karaoke = response.data
            })
        }
    },
    created()
    {
       this.ApiDetailKaraoke()
    }
}
</script>

<style scoped>
.list-link {padding-left: 0 !important;}
.name-karaoke {font-size: 18px;font-weight: bold}
</style>