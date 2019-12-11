<template>
    <div id="page-karaoke">
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row>
                
               <v-col cols="12" sm="4" md="3">
                   <ul class="list list-filter">
                        <li>
                            <v-select
                                :items="provinces"
                                v-model="selected_province"
                                label="Tỉnh / Thành Phố"
                                item-text="NAME_PROVINCE"
                                item-value="ID_PROVINCE"
                            ></v-select>
                        </li>
                        <li>
                            <v-select
                                :items="districts"
                                v-model="district"
                                label="Quận / Huyện"
                                item-text="NAME_DISTRICT"
                                item-value="ID_DISTRICT"
                            ></v-select>
                        </li>
                       <li>
                        <v-range-slider
                            v-model="range"
                            :max="max"
                            :min="min"
                            hide-details
                            class="align-center"
                        >
                            <template v-slot:prepend>
                                <span>{{range[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</span>
                            </template>
                            <template v-slot:append>
                                 <span>{{range[1].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</span>
                            </template>
                        </v-range-slider>
                        </li>
                   </ul>
               </v-col>
               <v-col cols="12" sm="8" md="9">
                   <v-row>
                        <item-karaoke v-for="(karaoke,index) in karaokes" :key="index"  :karaoke="karaoke" />
                   </v-row>
               </v-col>
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
            district: this.$route.query.ID_DISTRICT,
            min: 0,
            max: 500000,
            slider: 40,
            range: [0, 500000],
            selected_province: this.$route.query.ID_PROVINCE,
            karaokes_tmp: []
        }
    },
    watch:
    {
        range(newVal)
        {

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
            
                await this.$http.get(this.$store.state.API_URL + 'karaoke?ID_DISTRICT='+this.$route.query.ID_DISTRICT).then((response) => {
                    this.karaokes = response.data
                    this.karaokes_tmp = response.data
                })
            }
            else{
               
                await this.$http.get(this.$store.state.API_URL + 'karaoke?ID_PROVINCE='+this.$route.query.ID_PROVINCE).then((response) => {
                    this.karaokes = response.data
                    this.karaokes_tmp = response.data
                })
            }
            this.$store.state.loading = await false
        }
    },
    created()
    {
        this.ApiProvince()
        this.ApiGetAddress()
        if(this.$route.query.ID_PROVINCE != 'null')
        {
            this.ApiDistrict(this.$route.query.ID_PROVINCE)
        }
        // console.log(this.$router)
        
    }   
}
</script>
<style scoped>

a {color: rgb(151, 44, 44) !important;}
a:hover {color: #f65e39 !important;}
.group-search {padding: 0 15px;border: 1px solid #e2e2e2;height: 60px;line-height: 60px;border-radius: 7px;margin-bottom: 10px;;}
.input-search {width: calc(100% - 24px); padding-left: 7px;}
.input-search:focus{outline: none}
.list-filter li {list-style: none}
.list-filter {padding: 7px !important;border-radius: 5px;border: 1px solid #e2e2e2;background: #fff;box-shadow: 1px 2px 3px 0 #e2e2e2e2;}
</style>