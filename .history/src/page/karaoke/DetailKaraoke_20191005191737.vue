<template>
<div id="detail-karaoke">
    <header-tool-bar />
    <div class="banner-karaoke">
        <v-img></v-img>
    </div>
</div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
    },
    methods:{
        ApiDetailKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url'+this.$route.params.safeurl).then((response) => {
                console.log(response.data)
            })
        }
    },
    created()
    {
       this.ApiDetailKaraoke()
    }
}
</script>