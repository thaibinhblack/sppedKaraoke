<template>
    <div class="header-search">
            <v-container fluid grid-list-xs class="custom">
                <v-row>
                    <v-col cols="12" md="3">
                        <div class="group-search">
                            <v-icon>mdi-map-marker</v-icon>
                            <select class="input-search" 
                            name="provinces" 
                            v-model="map.province"
                            @change="ApiDistrict()">
                                <option selected value="null">TỈNH / THÀNH PHỐ</option>
                                <option v-for="(province,i) in provinces" :key="i" :value="province.ID_PROVINCE">
                                    {{province.NAME_PROVINCE}}
                                </option>
                            </select>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="group-search">
                            <v-icon>mdi-map-marker</v-icon>
                            <select class="input-search" name="provinces" v-model="map.ID_DISTRICT" @change="changeDistrict()">
                                <option selected>QUẬN / HUYỆN</option>
                                <option v-for="(district,index) in districts" :key="index" :value="district.ID_DISTRICT">
                                    {{district.NAME_DISTRICT}}
                                </option>
                                
                            </select>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="group-search">
                            <v-icon>mdi-magnify</v-icon>
                            <input class="input-search" type="text" placeholder="Nhập từ khóa tìm kiếm" />
                        </div>
                    </v-col>
                    <v-col cols="12" md="3" style="padding: 0 12px;">
                        <v-row>
                            <v-col cols="12" md="6">
                                <div class="group-search">
                                    <v-icon>mdi-account</v-icon>
                                    <input class="input-search" type="number" value="0"/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-btn class="btn-search" color="primary">TÌM KIẾM</v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-col>
                    
                </v-row>
            </v-container>
        </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data()
    {
        return {
            provinces: [],
            districts: [],
            map: {
                province: null
            }
        }
    },
    methods: {
        ...mapActions(["commitgoToProvince","commitsearchKaraoke"]),
        ApiProvince()
        {
            this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
                
            })
        },
        ApiDistrict()
        {
            this.$http.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+this.map.province).then((response) => {
                this.districts = response.data
            })
            this.commitgoToProvince(this.map.province)
            this.commitsearchKaraoke({
                    SEARCH: 'ID_PROVINCE',
                    VALUE: this.map.province
            })
        },
        changeDistrict()
        {
            this.commitsearchKaraoke({
                    SEARCH: 'ID_DISTRICT',
                    VALUE: this.map.ID_DISTRICT
            })
        }
    },
    created()
    {
        this.ApiProvince()
    }
}
</script>

<style scoped>

.group-search {padding: 0 15px;border: 1px solid #e2e2e2;height: 60px;line-height: 60px;border-radius: 7px;;}
.input-search {width: calc(100% - 24px); padding-left: 7px;}
.input-search:focus{outline: none}

.btn-search {height: 60px !important;background-image: linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)!important}
.header-search {background: #fff;}
</style>
