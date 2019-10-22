<template>
<div id="page-promotion">
    <header-tool />
    <div class="banner-promotion">

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
            this.$http.get(this.$store.state.API_URL + 'promotion/'+this.$route.query.UUID_PROTION).then((response) => {
                this.promotion = response.data
            })
        }
    },
}
</script>