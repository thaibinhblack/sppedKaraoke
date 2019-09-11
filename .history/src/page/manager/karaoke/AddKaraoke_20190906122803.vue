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
                 <v-form>
                    <v-card>
                        <v-alert :type="message.type" v-if="message.text != null" :value="true">
                            {{message.text}}
                        </v-alert>
                        <v-card-title primary-title>
                            <span class="title-label" style="font-size: 15px;">Thêm chi nhánh mới {{karaoke.NAME_BAR_KARAOKE}}</span>
                        </v-card-title>
                        <v-card-text>
                        
                            <v-row>
                                <v-col cols="12" sm="12" class="group-logo-karaoke">
                                    <v-avatar
                                        size="150"
                                        color="#e2e2e2"
                                        class="logo-karaoke">
                                        <input type="file" ref="MyAvatar" class="input-logo" @change="renderLogo()"> 
                                        <img v-if="karaoke.LOGO != null" :src="karaoke.LOGO" alt="alt">
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
                                        item-text="NAM_PROVINCE"
                                        v-model="karaoke.ID_PROVINCE"
                                        prepend-icon="mdi-map-marker"
                                        label="TỈNH / THÀNH PHỐ"
                                    ></v-select>
                                </v-col>
                                <v-col class="12" sm="4">
                                     <v-select
                                        :items="district"
                                        item-value="ID_PROVINCE"
                                        item-text="NAM_PROVINCE"
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
                                        :counter="12"
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
                                    <button class="btn-add"><v-icon>mdi-plus</v-icon> Thêm mới</button>
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
import axios from 'axios'
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
            }
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
        CreateKaraoke()
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
            axios.post(this.$store.state.API_URL + 'karaoke',data)
            .then((response) => {
                this.message.type = 'success'
                this.methods.text = 'Thêm chi nhánh mới thành công!'
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! xin vui lòng thử lại!'
            })
           
        }
    }
}
</script>

<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 0;z-index: 999;width: 100%;height: 100%;}
</style>