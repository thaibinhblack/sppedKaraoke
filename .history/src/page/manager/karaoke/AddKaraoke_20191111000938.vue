<template>
    <div id="page-add-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="4">
                THÊM CHI NHÁNH MỚI
            </v-col>
            <v-col cols="12" sm="8" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link to="/manager-karaoke/karaoke"> Danh sách karaoke</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>Thêm mới</li>
                </ul>
            </v-col>
            <v-col class="12" sm="12">
                 <v-form @submit.prevent="createKaraoke()" >
                    <v-card>
                       
                        <v-card-title primary-title>
                            <span class="title-label" style="font-size: 15px;">Thêm chi nhánh mới {{karaoke.NAME_BAR_KARAOKE}}</span>
                        </v-card-title>
                        <v-card-text>
                             <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                            <v-row>
                                <v-col cols="12" sm="12" style="position:relative;">
                                    <v-img v-if="BANNER != null" :src="BANNER" width="100%" height="180px"></v-img>
                                    <v-img v-else src="http://placehold.it/300x180/" width="100%" height="180px"></v-img>
                                    <input class="upload-banner" type="file" ref="banner" @change="renderBanner()">
                                    <v-icon class="icon-upload" color="blue">mdi-upload</v-icon>
                                </v-col>
                                <v-col cols="12" sm="12" class="group-logo-karaoke">
                                    <v-avatar
                                        size="150"
                                        color="#e2e2e2"
                                        class="logo-karaoke">
                                        <input type="file" ref="MyAvatar" class="input-logo" @change="renderLogo()"> 
                                        <img v-if="LOGO != null" :src="LOGO" alt="alt">
                                    </v-avatar>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-text-field
                                        name="NAME_BAR_KARAOKE"
                                        label="TÊN CHI NHÁNH"
                                        prepend-icon="mdi-account-card-details-outline"
                                        required
                                        :counter="20"
                                        v-model="karaoke.NAME_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-select
                                        :items="province"
                                        item-value="ID_PROVINCE"
                                        item-text="NAME_PROVINCE"
                                        v-model="karaoke.ID_PROVINCE"
                                        @change="ApiGetDistrict()"
                                        prepend-icon="mdi-map-marker"
                                        label="TỈNH / THÀNH PHỐ"
                                    ></v-select>
                                </v-col>
                                <v-col class="12" sm="4">
                                     <v-select
                                        :items="district"
                                        item-value="ID_DISTRICT"
                                        item-text="NAME_DISTRICT"
                                        v-model="karaoke.ID_DISTRICT"
                                        label="QUẬN / HUYỆN"
                                        prepend-icon="mdi-map-marker"
                                    ></v-select>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-text-field
                                        name="ADDRESS_BAR_KARAOKE"
                                        label="ĐỊA CHỈ CHI NHÁNH"
                                        prepend-icon="mdi-map-marker"
                                        required
                                        :counter="50"
                                        v-model="karaoke.ADDRESS_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-text-field
                                        name="EMAIL"
                                        label="EMAIL CHI NHÁNH"
                                        prepend-icon="mdi-email"
                                        required
                                        :counter="50"
                                        v-model="karaoke.EMAIL_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-text-field
                                        name="PHONE"
                                        label="SỐ ĐIỆN THOẠI"
                                        prepend-icon="mdi-phone"
                                        required
                                        :counter="12"
                                        v-model="karaoke.PHONE_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-text-field
                                        name="RENT_COST_MIN"
                                        label="Tiền thuê phòng (min)"
                                        prepend-icon="mdi-currency-usd"
                                        required
                                        v-model="karaoke.RENT_COST_MIN"
                                    ></v-text-field>
                                </v-col>
                                 <v-col class="12" sm="4">
                                    <v-text-field
                                        name="RENT_COST_MAX"
                                        label="Tiền thuê phòng (max)"
                                        prepend-icon="mdi-currency-usd"
                                        v-model="karaoke.RENT_COST_MAX"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <label class="title-lable" style="font-weight:bold;margin-bottom:15px;">Nội dung</label>
                                    <vue-editor class="content" v-model="karaoke.CONTENT_BAR_KARAOKE"></vue-editor>
                                </v-col>
                            </v-row>
                        
                        </v-card-text>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <button class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                 </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import uuid from 'uuid'
import UrlSafeString from 'url-safe-string'
import { VueEditor } from "vue2-editor";
import * as firebase from 'firebase'
export default {
    components: {
        VueEditor
    },
    data()
    {
        return {
            karaoke: {
                
                STAR_RATING: 0 ,
                NUMBER_REATED: 0
            },
            message: {
                type: null,
                text: null
            },
            province : [],
            district: [],
            LOGO: null,
            BANNER: null
        }
    },
    methods:{
        renderBanner()
        {
            var reader  = new FileReader()
            const file = this.$refs.banner.files[0]
            this.karaoke.BANNER_BAR_KARAOKE = file
            this.BANNER  = URL.createObjectURL(file)
        },
        renderLogo()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            this.karaoke.LOGO_BAR_KARAOKE = file
            this.LOGO  = URL.createObjectURL(file)
            // console.log(file)
        },
        createKaraoke()
        {
            this.$store.state.loading = true
            this.karaoke.UUID_BAR_KARAOKE = uuid.v4()
            const data = new FormData()
            data.append("UUID_BAR_KARAOKE",this.karaoke.UUID_BAR_KARAOKE)
            data.append("ID_DISTRICT", this.karaoke.ID_DISTRICT)
            data.append("ID_PROVINCE", this.karaoke.ID_PROVINCE)
           
            data.append("NAME_BAR_KARAOKE", this.karaoke.NAME_BAR_KARAOKE)
            data.append("ADDRESS_BAR_KARAOKE", this.karaoke.ADDRESS_BAR_KARAOKE)
            data.append("EMAIL_BAR_KARAOKE",this.karaoke.EMAIL_BAR_KARAOKE)
            data.append("PHONE_BAR_KARAOKE", this.karaoke.PHONE_BAR_KARAOKE)
            data.append("RENT_COST_MAX", this.karaoke.RENT_COST_MAX)
            data.append("RENT_COST_MIN", this.karaoke.RENT_COST_MIN)
            data.append("CONTENT_BAR_KARAOKE",this.karaoke.CONTENT_BAR_KARAOKE)
           
            var storageRef = firebase.storage().ref('');
            storageRef.child(this.karaoke.BANNER_BAR_KARAOKE.name).put(this.karaoke.BANNER_BAR_KARAOKE).then(function(snapshot) {
                var storage = firebase.storage().ref('');
                storage.child(this.karaoke.BANNER_BAR_KARAOKE.name).getDownloadURL().then((url) => {
                    console.log(url)
                    data.append("BANNER_BAR_KARAOKE",url)            
                });
            });
            storageRef.child(this.karaoke.LOGO_BAR_KARAOKE.name).put(this.karaoke.LOGO_BAR_KARAOKE).then(function(snapshot) {
                var storage = firebase.storage().ref('');
                storage.child(this.karaoke.LOGO_BAR_KARAOKE.name).getDownloadURL().then((url) => {
                    console.log(url)             
                    data.append("LOGO_BAR_KARAOKE",url)
                    const tagGenerator  = new UrlSafeString();
                    data.append("URL_SAFE", tagGenerator.generate(this.karaoke.NAME_BAR_KARAOKE))
                    // console.log(this.karaoke)
                    this.$http.post(this.$store.state.API_URL + 'karaoke?api_token='+this.$session.get('token'),data,)
                    .then((response) => {
                        this.message.type = 'success'
                        this.message.text = 'Thêm chi nhánh mới thành công!'
                        this.karaoke = {
                            STAR_RATING: 0 ,
                            NUMBER_REATED: 0
                        }
                        this.LOGO = null
                        console.log(response.data)
                    }).catch((error) => {
                        console.log(error)
                        this.message.type = 'error'
                        this.message.text = 'Lôi! xin vui lòng thử lại!'
                    })
                    this.$store.state.loading = false
                });
            });
            
            
            
           
        },
        ApiGetProvince()
        {
            this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
                this.province = response.data
            })
        },
        ApiGetDistrict()
        {
            this.$http.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+this.karaoke.ID_PROVINCE).then((response) => {
                this.district = response.data
            })
        },
       
    },
    async created()
    {
        this.$store.state.loading = true
        await this.ApiGetProvince()
        this.$store.state.loading = false
    }
}
</script>

<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 0;z-index: 999;width: 100%;height: 100%;}
.icon-upload,.upload-banner {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 998; cursor: pointer;}
.upload-banner {width: 100%;height: 100%;z-index: 9999;opacity: 0;}
</style>