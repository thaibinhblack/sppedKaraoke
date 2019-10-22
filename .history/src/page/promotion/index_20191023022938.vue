<template>
<div id="page-promotion">
    <header-tool />
    <div class="banner-promotion">
        <v-img height="300px" :src="$store.state.PUBLIC_URL + promotion.BANNER_PROMOTION"></v-img>
    </div>
    <v-container grid-list-xs>
        
    </v-container>
</div>
</template>

<script>
export default {
    components: {
        'header-tool': () => import ('@/components/header/ToolBar.vue')
    },
    data()
    {
        return {
            promotion: {}
        }
    },
    methods: {
        ApiDetailPromotion()
        {
            this.$http.get(this.$store.state.API_URL + 'promotion/'+this.$route.query.UUID_PROMOTION).then((response) => {
                this.promotion = response.data
                console.log(response.data)
            })
        }
    },
    created() {
        console.log(this.$route)
        if(this.$route.query.UUID_PROMOTION)
        {
            this.ApiDetailPromotion()
        }
    },
}
</script>