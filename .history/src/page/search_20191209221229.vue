<template>
    <div id="page-karaoke">
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row>
                <item-karaoke v-for="(karaoke,index) in karaokes" :key="index"  :karaoke="karaoke" />
            </v-row>
        </v-container>
        <v-overlay v-if="$store.state.loading == true" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            address: {},
            karaokes: [],
            province: null,
            provinces: [],
            districts: [],
            district: null
        }
    },
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'item-karaoke': () => import('@/components/contents/itemKaraoke.vue')
    },
    methods:{
        ApiProvince()
        {
            this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
            })
        },
        ApiDistrict(ID_PROVINCE)
        {
            this.$http.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+ID_PROVINCE).then((response) => {
                this.districts = response.data
            })
        },
        async ApiGetAddress()
        {
            this.$store.state.loading = await true
            if(this.$route.query.ID_DISTRICT)
            {
                await this.$http.get(this.$store.state.API_URL + 'district/'+this.$route.query.ID_DISTRICT).then((response) => {
                   this.address = response.data
                   this.district = this.$route.query.ID_DISTRICT
                   this.ApiDistrict(response.data.ID_PROVINCE)
                })
                await this.$http.get(this.$store.state.API_URL + 'karaoke?ID_DISTRICT='+this.$route.query.ID_DISTRICT).then((response) => {
                    this.karaokes = response.data
                })
            }
            else{
                await this.$http.get(this.$store.state.API_URL + 'province/'+this.$route.query.ID_PROVINCE).then((response) => {
                   this.address = response.data
                   this.ApiDistrict(response.data.ID_PROVINCE)
                })
                await this.$http.get(this.$store.state.API_URL + 'karaoke?ID_PROVINCE='+this.$route.query.ID_PROVINCE).then((response) => {
                    this.karaokes = response.data
                })
            }
            this.$store.state.loading = await false
        }
    },
    created()
    {
        this.ApiProvince()
        this.ApiGetAddress()
        
    }   
}
</script>
<style scoped>

a {color: #333 !important;}
a:hover {color: #f65e39 !important;}
.group-search {padding: 0 15px;border: 1px solid #e2e2e2;height: 60px;line-height: 60px;border-radius: 7px;margin-bottom: 10px;;}
.input-search {width: calc(100% - 24px); padding-left: 7px;}
.input-search:focus{outline: none}

</style>