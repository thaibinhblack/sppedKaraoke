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
                                        name="PHONE"
                                        label="RATING"
                                        prepend-icon="mdi-star"
                                        required
                                        
                                        value="0"
                                        disabled
                                        v-model="karaoke.STAR_RATING"
                                    ></v-text-field>
                                </v-col>
                                 <v-col class="12" sm="4">
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
            <v-col class="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-label">DANH SÁCH PHÒNG CỦA CHI NHÁNH {{karaoke.NAME_BAR_KARAOKE}}</span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btn-add"><router-link to="/manager-karaoke/karaoke/:uuid/add-room"><v-icon>mdi-plus</v-icon> Thêm phòng mới</router-link></button>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="room"
                        >
                            
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import uuid from 'uuid'
import UrlSafeString from 'url-safe-string'
export default {
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
                {text: 'TÊN PHÒNG', value: 'NAME_ROOM_BAR_KARAOKE', align: 'center'},
                {text: 'GIÁ THUÊ / giờ', value: 'RENT_COST'},
                {text: 'SỨC CHỨA', value: 'CAPACITY', align: 'center'},
                {text: 'NGƯỜI TẠO', value: 'USER_CREATE'},
                {text: 'RATING', value: 'STAR_RATING', align: 'center'},
                {text: 'SL RATING', value: 'NUMBER_RATED'},
                {text: 'NGÀY TẠO', value: 'CREATED_AT', align: 'center'},
                {text: '', value: 'ACTION'},
            ]
        }
    },
    methods:{
        renderLogo()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            this.karaoke.LOGO_BAR_KARAOKE = file
            this.karaoke.LOGO  = URL.createObjectURL(file)
            console.log(this.karaoke.LOGO)
            // console.log(file)
        },
        createKaraoke()
        {
            this.karaoke.UUID_BAR_KARAOKE = uuid.v4()
            if(this.$session.has('user'))
            {   
                this.karaoke.USER_CREATE = this.$session.get("user").EMAIL
            }
            else
            {
                this.karaoke.USER_CREATE = this.$session.get("user_social").email
            }
            const data = new FormData()
            data.append("UUID_BAR_KARAOKE",this.karaoke.UUID_BAR_KARAOKE)
            data.append("ID_DISTRICT", this.karaoke.ID_DISTRICT)
            data.append("ID_PROVINCE", this.karaoke.ID_PROVINCE)
            data.append("LOGO_BAR_KARAOKE",this.karaoke.LOGO_BAR_KARAOKE)
            data.append("NAME_BAR_KARAOKE", this.karaoke.NAME_BAR_KARAOKE)
            data.append("ADDRESS_BAR_KARAOKE", this.karaoke.ADDRESS_BAR_KARAOKE)
            data.append("EMAIL_BAR_KARAOKE",this.karaoke.EMAIL_BAR_KARAOKE)
            data.append("PHONE_BAR_KARAOKE", this.karaoke.PHONE_BAR_KARAOKE)
            data.append("USER_CREATE", this.karaoke.USER_CREATE)
            data.append("STAR_RATING", this.karaoke.STAR_RATING)
            data.append("NUMBER_REATED", this.karaoke.NUMBER_REATED)
            const tagGenerator  = new UrlSafeString();
            data.append("URL_SAFE", tagGenerator.generate(this.karaoke.NAME_BAR_KARAOKE))
            // console.log(this.karaoke)
            axios.post(this.$store.state.API_URL + 'karaoke',data)
            .then((response) => {
                this.message.type = 'success'
                this.methods.text = 'Thêm chi nhánh mới thành công!'
                this.karaoke = {
                    LOGO: null,
                    STAR_RATING: 0 ,
                    NUMBER_REATED: 0
                }
                console.log(response.data)
            }).catch((error) => {
                console.log(this.error)
                this.message.type = 'error'
                this.message.text = 'Lôi! xin vui lòng thử lại!'
            })
           
        },
        ApiGetProvince()
        {
            axios.get(this.$store.state.API_URL + 'province').then((response) => {
                this.province = response.data
            })
        },
        ApiGetDistrict()
        {
            axios.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+this.karaoke.ID_PROVINCE).then((response) => {
                this.district = response.data
            })
        },
        ApiGetKaraoke()
        {
            axios.get(this.$store.state.API_URL + 'karaoke/'+this.$route.params.uuid).then((response) => {
                this.karaoke = response.data
            })
        }
    },
    created()
    {
        this.ApiGetProvince()
        this.ApiGetKaraoke()
    }
}
</script>

<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 0;z-index: 999;width: 100%;height: 100%;}
</style>