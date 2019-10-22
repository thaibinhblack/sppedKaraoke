<template>
<div id="page-promotion">
    <header-tool />
    <div class="banner-promotion">
        <v-img height="auto" width="100%" :src="$store.state.PUBLIC_URL + promotion.BANNER_PROMOTION"></v-img>
    </div>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="12" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/">Trang chủ</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link to="promotion">Danh sách khuyến mãi</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{promotion.NAME_PROMOTION}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12">
                <h3 class="title-promotion">{{promotion.NAME_PROMOTION}}</h3>
                <v-row class="group-time">
                    <v-col cols="12" sm="6">
                        {{moment(promotion.DATE_STARTED).format('DD/MM/YYYY')}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{promotion.DATE_END}}
                    </v-col>
                </v-row>
                <p v-html="promotion.CONTENT_PROMOTION"></p>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import moment from 'moment'
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

<style scoped>
.list-link {float: left;}
.list-link li a {color: #333 !important;}
.list-link li a:hover {color: #f65e39 !important}
.title-promotion {font-size: 24px; text-align: center;font-weight: bold;padding: 25px 0;}
</style>