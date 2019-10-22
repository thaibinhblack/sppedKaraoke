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
                        <div class="time left">
                            <p>Thời gian áp dụng</p>
                            <span>{{TIME_START}}</span>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="time right">
                            <p>Thời gian áp dụng</p>
                            <span>{{TIME_END}}</span>
                        </div>
                    </v-col>
                </v-row>
                <p v-html="promotion.CONTENT_PROMOTION"></p>
            </v-col>
        </v-row>
        <section>
            <v-row>
                <v-col cols="12" sm="12">
                    Các chi nhánh áp dụng khuyến mãi
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    
                </v-col>
            </v-row>
        </section>
    </v-container>
     <v-overlay :value="$store.state.loading" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
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
            promotion: {},
            karaokes: []
        }
    },
    computed: {
        TIME_START()
        {
            return moment(this.promotion.DATE_STARTED).format('DD/MM/YYYY')
        },
        TIME_END()
        {
            return moment(this.promotion.DATE_END).format('DD/MM/YYYY')
        }
    },
    methods: {
        ApiGetKaraokePromotion()
        {
            this.$http.get(this.$store.state.API_URL + 'promotion/'+this.$route.query.UUID_PROMOTION+'/karaoke').then((response) => {
                this.karaokes = response.data
            })
        },
        ApiDetailPromotion()
        {
            this.$http.get(this.$store.state.API_URL + 'promotion/'+this.$route.query.UUID_PROMOTION).then((response) => {
                this.promotion = response.data
                console.log(response.data)
            })
        }
    },
    async created() {
       this.$store.state.loading = true
        if(this.$route.query.UUID_PROMOTION)
        {
            await this.ApiDetailPromotion()
            await this.ApiGetKaraokePromotion()
        }
        this.$store.state.loading = false
    },
}
</script>

<style scoped>
.list-link {float: left;}
.list-link li a {color: #333 !important;}
.list-link li a:hover {color: #f65e39 !important}
.title-promotion {font-size: 24px; text-align: center;font-weight: bold;padding: 25px 0;}
.group-time .time {display: inline-block;width: 200px;text-align: center;float: right;border: 1px solid #e2e2e2;background: #fff; padding: 7px;}
.group-time .time p {margin-bottom: 5px;font-weight: bold}
.time.left {float: right;}
.time.right {float: left}
</style>