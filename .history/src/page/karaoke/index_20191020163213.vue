<template>
    <div id="page-karaoke">
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                    <ul class="list-link">
                        <li><v-icon>mdi-map-marker</v-icon> <router-link :to="'/karaoke?ID_PROVINCE='+address.ID_PROVINCE">{{address.NAME_PROVINCE}}</router-link></li>
                        <li v-if="$route.query.ID_DISTRICT"><v-icon>mdi-chevron-right</v-icon></li>
                        <li>{{address.NAME_DISTRICT}}</li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <div class="sidee-bar-left-karaoke group-search" >
                        <v-icon>mdi-map-marker</v-icon>
                        <select class="input-search" 
                        name="provinces" 
                        v-model="address.ID_PROVINCE">
                            <option selected value="null">TỈNH / THÀNH PHỐ</option>
                            <option v-for="(province,i) in provinces" :key="i" :value="province.ID_PROVINCE">
                                {{province.NAME_PROVINCE}}
                            </option>
                        </select>
                    </div>
                    <div class="sidee-bar-left-karaoke group-search" >
                        <v-icon>mdi-map-marker</v-icon>
                        <select class="input-search" 
                        name="districts" 
                        v-model="district">
                            <option selected value="null">QUẬN / HUYỆN</option>
                            <option v-for="(district,i) in districts" :key="i" :value="district.ID_DISTRICT">
                                {{district.NAME_DISTRICT}}
                            </option>
                        </select>
                    </div>
                </v-col>
                <v-col cols="12" sm="8" md="9">
                    <v-row>
                        <item-karaoke   v-for="(karaoke,index) in karaokes" :key="index"  :karaoke="karaoke" />
                        
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
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
        ApiGetAddress()
        {
            if(this.$route.query.ID_DISTRICT)
            {
                this.$http.get(this.$store.state.API_URL + 'district/'+this.$route.query.ID_DISTRICT).then((response) => {
                   this.address = response.data
                   this.district = this.$route.query.ID_DISTRICT
                   this.ApiDistrict(response.data.ID_PROVINCE)
                })
                this.$http.get(this.$store.state.API_URL + 'karaoke?ID_DISTRICT='+this.$route.query.ID_DISTRICT).then((response) => {
                    this.karaokes = response.data
                })
            }
            else{
                this.$http.get(this.$store.state.API_URL + 'province/'+this.$route.query.ID_PROVINCE).then((response) => {
                   this.address = response.data
                   this.ApiDistrict(response.data.ID_PROVINCE)
                })
                this.$http.get(this.$store.state.API_URL + 'karaoke?ID_PROVINCE='+this.$route.query.ID_PROVINCE).then((response) => {
                    this.karaokes = response.data
                })
            }
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