<template>
    <div id="page-add-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="6" md="4">
                THÔNG TIN CHI TIẾT {{karaoke.NAME_BAR_KARAOKE}}
            </v-col>
            <v-col cols="12" sm="8" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link to="/manager-karaoke/karaoke">Danh sách karaoke</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.NAME_BAR_KARAOKE}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12">
                 <v-form @submit.prevent="updateKaraoke()" >
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
                                     <v-img v-else-if="karaoke.BANNER_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" width="100%" height="180px"></v-img>
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
                                        <img v-if="karaoke.LOGO != null" :src="karaoke.LOGO" alt="alt">
                                        <img v-else :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" alt="alt">
                                    </v-avatar>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="NAME_BAR_KARAOKE"
                                        label="TÊN CHI NHÁNH"
                                        prepend-icon="mdi-account-card-details-outline"
                                        required
                                        :counter="20"
                                        v-model="karaoke.NAME_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
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
                                <v-col cols="12" sm="6" md="4">
                                     <v-select
                                        :items="district"
                                        item-value="ID_DISTRICT"
                                        item-text="NAME_DISTRICT"
                                        v-model="karaoke.ID_DISTRICT"
                                        label="QUẬN / HUYỆN"
                                        prepend-icon="mdi-map-marker"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="ADDRESS_BAR_KARAOKE"
                                        label="ĐỊA CHỈ CHI NHÁNH"
                                        prepend-icon="mdi-map-marker"
                                        required
                                        :counter="50"
                                        v-model="karaoke.ADDRESS_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="EMAIL"
                                        label="EMAIL CHI NHÁNH"
                                        prepend-icon="mdi-email"
                                        required
                                        :counter="50"
                                        v-model="karaoke.EMAIL_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="PHONE"
                                        label="SỐ ĐIỆN THOẠI"
                                        prepend-icon="mdi-phone"
                                        required
                                        :counter="12"
                                        v-model="karaoke.PHONE_BAR_KARAOKE"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="MIN_RENT_COST"
                                        label="Tiền thuê phòng (min)"
                                        prepend-icon="mdi-currency-usd"
                                        v-model="karaoke.RENT_COST_MIN"
                                    ></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="MIN_RENT_COST"
                                        label="Tiền thuê phòng (max)"
                                        prepend-icon="mdi-currency-usd"
                                        v-model="karaoke.RENT_COST_MAX"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="PHONE"
                                        label="RATING"
                                        prepend-icon="mdi-star"
                                        required
                                        
                                        value="0"
                                        disabled
                                        v-model="karaoke.STAR_RATING"
                                    ></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="PHONE"
                                        label="SỐ LƯỢT ĐÁNH GIÁ"
                                        prepend-icon="mdi-thumb-up"
                                        required
                                        value="0"
                                        disabled
                                        v-model="karaoke.NUMBER_REATED"
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
                                <v-col cols="12" sm="2">
                                    <button class="btn-add" type="submit"><v-icon>mdi-update</v-icon> Cập nhật</button>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <router-link class="btn btn-add" :to="'/map?karaoke='+karaoke.UUID_BAR_KARAOKE"><v-icon>mdi-map-marker</v-icon> Thêm địa chỉ trên bản đồ</router-link>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                 </v-form>
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-label">
                            Danh sách user quản lý chi nhánh
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="managers">
                            <template v-slot:item.AVATAR ="{item}">
                               <v-avatar
                                   size="70"
                                   color="#e2e2e2"
                               >
                                   <img v-if="item.AVATAR != null" :src="$store.state.PUBLIC_URL + item.AVATAR" alt="alt">
                               </v-avatar>
                            </template>
                            <template v-slot:item.GENDER="{item}">
                               <v-icon v-if="item.GENDER == 1">mdi-gender-male</v-icon>
                               <v-icon v-else>mdi-female</v-icon>
                            </template>
                            <template v-slot:item.ACTION="{item}">
                                <button><v-icon>mdi-delete</v-icon></button>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <list-room :NAME_BAR_KARAOKE="karaoke.NAME_BAR_KARAOKE" />
           <media-karaoke :karaoke="true" />
        </v-row>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {mapActions} from 'vuex'
import uuid from 'uuid'
import UrlSafeString from 'url-safe-string'
export default {
    components: {
        VueEditor,
        'list-room': () => import("@/components/manager/karaoke/ListRoomByKaraoke.vue"),
        'media-karaoke': () => import("@/components/manager/karaoke/MediaKaraoke.vue")
    },
    data()
    {
        return {
            karaoke: {
                LOGO: null,
                STAR_RATING: 0 ,
                NUMBER_REATED: 0
            },
            message: {
                type: null,
                text: null
            },
            province : [],
            district: [],
            headers: [
                {text: 'Avatar', value: 'AVATAR',sortable: false},
                {text: 'Tên người quản lý', value: 'DISPLAY_NAME'},
                {text: 'Email', value: 'EMAIL'},
                {text: 'SĐT', value: 'PHONE'},
                {text: 'Giới tính', value: 'GENDER', sortable: false},
                {text: 'Ngày sinh', value: 'BIRTH_DAY'},
                {text: 'Tác vụ', value: 'ACTION', sortable: false}
            ],
            managers: [],
            BANNER: null
           
            
        }
    },
    methods:{
        ...mapActions(["commitBarKaraoke"]),
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
            this.karaoke.LOGO  = URL.createObjectURL(file)
            console.log(this.karaoke.LOGO)
            // console.log(file)
        },
        async updateKaraoke()
        {
            this.$store.state.loading = true
            const data = new FormData()
            var storageRef = firebase.storage().ref('');
            storageRef.child(files[index].name).put(files[index]).then(function(snapshot) {
                  var storage = firebase.storage().ref('');
                  storage.child(files[index].name).getDownloadURL().then((url) => {
                       data.append("UUID_BAR_KARAOKE",this.karaoke.UUID_BAR_KARAOKE)
                        data.append("ID_DISTRICT", this.karaoke.ID_DISTRICT)
                        data.append("ID_PROVINCE", this.karaoke.ID_PROVINCE)
                        if(this.karaoke.LOGO != null)
                        {
                            data.append("LOGO_BAR_KARAOKE",url)
                        }
                        if(this.BANNER != null)
                        {
                            data.append("BANNER_BAR_KARAOKE",this.karaoke.BANNER_BAR_KARAOKE)
                        }
                        data.append("NAME_BAR_KARAOKE", this.karaoke.NAME_BAR_KARAOKE)
                        data.append("ADDRESS_BAR_KARAOKE", this.karaoke.ADDRESS_BAR_KARAOKE)
                        data.append("EMAIL_BAR_KARAOKE",this.karaoke.EMAIL_BAR_KARAOKE)
                        data.append("PHONE_BAR_KARAOKE", this.karaoke.PHONE_BAR_KARAOKE)
                        data.append("USER_CREATE", this.karaoke.USER_CREATE)
                        data.append("STAR_RATING", this.karaoke.STAR_RATING)
                        data.append("NUMBER_REATED", this.karaoke.NUMBER_REATED)
                        data.append("CONTENT_BAR_KARAOKE",this.karaoke.CONTENT_BAR_KARAOKE)
                        data.append("RENT_COST_MIN",this.karaoke.RENT_COST_MIN)
                        data.append("RENT_COST_MAX",this.karaoke.RENT_COST_MAX)
                        const tagGenerator  = new UrlSafeString();
                        data.append("URL_SAFE", tagGenerator.generate(this.karaoke.NAME_BAR_KARAOKE))
                        // console.log(this.karaoke)
                         this.$http.post(this.$store.state.API_URL + 'karaoke/'+this.$route.params.uuid+'/update?api_token='+this.$session.get('token'),data)
                        .then((response) => {  
                            this.message.type = 'success'
                            this.message.text = 'Thêm chi nhánh mới thành công!'
                        }).catch(() => {
                            // console.log(error)
                        
                            this.message.type = 'error'
                            this.message.text = 'Lôi! xin vui lòng thử lại!'
                            this.$store.state.loading = false
                        })
                        this.$store.state.loading = false
                  })
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
        ApiGetKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.params.uuid).then((response) => {
                this.karaoke = response.data
                this.commitBarKaraoke(response.data)
                this.ApiGetDistrict()
            })
        },
       
        ApiGetManager()
        {
            this.$http.get(this.$store.state.API_URL + 'manager/'+this.$route.params.uuid+'?api_token='+this.$session.get('token')).then((response) => {
                this.managers = response.data
                console.log(response.data)
            })
        }
    },
    created()
    {
        this.ApiGetProvince()
        this.ApiGetKaraoke()
        this.ApiGetManager()
       
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