<template>
<div id="detail-karaoke">
    <header-tool-bar />
    <div class="banner-karaoke" v-if="karaoke.BANNER_BAR_KARAOKE != null">
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
                 <fb-comment data-width="100%" width="100%" url="http://127.0.0.1:8080/karaoke/karaoke-star" />
            </v-col>
            <v-col cols="12" sm="5" md="4"></v-col>
        </v-row>
    </v-container>
    <v-overlay :value="$store.state.loading" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
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
        async ApiDetailKaraoke()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.safeurl).then((response) => {
                this.karaoke = response.data
            })
            this.$store.state.loading = false
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
.name-karaoke {font-size: 22px;font-weight: bold;margin-bottom: 15px;}
</style>