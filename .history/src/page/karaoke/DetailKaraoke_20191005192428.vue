<template>
<div id="detail-karaoke">
    <header-tool-bar />
    <div class="banner-karaoke">
        <v-img :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" width="100%" height="350px" aspect-ratio="1.7"></v-img>
    </div>
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