<template>
<div id="page-add-promotion" style="padding: 15px;">
    <v-row>
         <v-col cols="12" sm="4">
                Thông tin khuyến mãi {{promotion.NAME_PROMOTION}}
        </v-col>
        <v-col cols="12" sm="8" class="group-link">
            <ul class="list-link">
                <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                <li><v-icon>mdi-chevron-right</v-icon></li>
                <li><router-link to="/manager-karaoke/promotion"> Danh khuyến mãi</router-link></li>
                <li><v-icon>mdi-chevron-right</v-icon></li>
                <li>Thêm mới</li>
            </ul>
        </v-col>
        <v-col cols="12" sm="12">
            <v-form @submit.prevent="createPromotion()">
                <v-card>
                    <v-card-text>
                        
                        <v-row>
                            <v-col cols="12" sm="12" class="banner">
                                    <v-img v-if="promotion.BANNER_PROMOTION != null" :src="$store.state.PUBLIC_URL + promotion.BANNER_PROMOTION" height="auto"></v-img>
                                    <v-img v-else-if="banner != null" :src="banner" height="180px"></v-img>
                                    <v-img v-else src="http://placehold.it/300x220/" width="100%" height="180px"></v-img>
                                    <v-icon class="upload" color="#f65e39">mdi-upload</v-icon>
                                    <input class="upload" type="file" ref="banner" @change="renderBanner()" required>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="NAME_PROMOTION"
                                    label="Tên khuyến mãi"
                                    v-model="promotion.NAME_PROMOTION"
                                    prepend-icon="mdi-calendar-text-outline"
                                    placeholder="Nhập tên khuyến mãi"
                                    required
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="VALUE_SAFE_OFF"
                                        label="Khuyến mãi (%)"
                                        v-model="promotion.VALUE_SAFE_OFF"
                                        type="number"
                                        min="0"
                                        max="100"
                                        :error-messages="promotion.VALUE_SAFE_OFF > 100 ? 'Bạn đã nhập sai': ''"
                                        prepend-icon="mdi-calendar-edit"
                                        placeholder="Nhập % khuyến mãi"
                                        required
                                    ></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="MA_KHUYEN_MAI"
                                        label="Mã khuyến mãi"
                                        v-model="promotion.CODE_PROMOTION"
                                        type="text"
                                        prepend-icon="mdi-barcode"
                                        placeholder="Nhập mã khuyến mãi"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        name="SL_KM"
                                        label="Số lượng mã khuyến mãi"
                                        v-model="promotion.NUMBER_PROMOTION"
                                        type="number"
                                        prepend-icon="mdi-barcode"
                                        min="1"
                                        placeholder="Nhập số lượng mã khuyến mãi"
                                        required
                                    ></v-text-field>
                                </v-col>
                                 
                                <v-col class="12" sm="4">
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="promotion.DATE_STARTED"
                                            label="Ngày bắt đầu"
                                            hint="DD/MM/YYYY"
                                            persistent-hint
                                            prepend-icon="mdi-calendar-range"
                                            
                                            required
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date_start" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class="12" sm="4">
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="promotion.DATE_END"
                                            label="Ngày kết thúc"
                                            hint="DD/MM/YYYY"
                                            persistent-hint
                                            prepend-icon="mdi-calendar-range"
                                        
                                            required
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <label style="font-weight:bold">Chọn chi nhánh</label> <br />
                                    <ul class="list-karaoke" v-for="(karaoke,index) in karaokes" :key="index">
                                        <li>
                                            <v-checkbox  :label="karaoke.NAME_BAR_KARAOKE"
                                            v-model="check" :value="karaoke.UUID_BAR_KARAOKE"></v-checkbox>
                                     </li>
                                    </ul>
                                    
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <label class="title-lable" style="font-weight:bold;margin-bottom:15px;">Nội dung khuyến mãi</label>
                                    <vue-editor class="content" v-model="promotion.CONTENT_PROMOTION"></vue-editor>
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
import { VueEditor } from "vue2-editor";
export default {
    components: {
        VueEditor
    },
    data()
    {
        return {
            promotion: {
                DATE_STARTED:  this.formatDate(new Date().toISOString().substr(0, 10)),
                DATE_END: this.formatDate(new Date().toISOString().substr(0, 10)),
                CONTENT_PROMOTION: ""
            },
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            date_start:  new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            banner: null,
            karaokes: [],
            check: []
        }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.promotion.DATE_END = this.formatDate(val)
      },
      date_start(val)
      {
           this.promotion.DATE_STARTED = this.formatDate(val)
      }
    },
    methods: {
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        renderBanner()
        {
            const file = this.$refs.banner.files[0]
            this.promotion.BANNER_PROMOTION = file
            this.banner = URL.createObjectURL(file)
        },
        api_promotion()
        {
            this.axios.get(this.$store.state.API_URL + 'promotion/'+this.$route.params.UUID_PROMOTION+'/detail').then((response) => {
                this.promotion = response.data
            })
        },
        createPromotion()
        {
            const data = new FormData()
            data.append("BANNER_PROMOTION",this.promotion.BANNER_PROMOTION)
            data.append("NAME_PROMOTION", this.promotion.NAME_PROMOTION)
            data.append("VALUE_SAFE_OFF",this.promotion.VALUE_SAFE_OFF)
            data.append("CODE_PROMOTION",this.promotion.CODE_PROMOTION)
            data.append("NUMBER_PROMOTION",this.promotion.NUMBER_PROMOTION)
            data.append("DATE_STARTED",this.date_start)
            data.append("DATE_END",this.date)
            data.append("CONTENT_PROMOTION",this.promotion.CONTENT_PROMOTION)
            data.append("checks",this.check)
            this.$http.post(this.$store.state.API_URL +'promotion?api_token='+this.$cookies.get('token'),data)
            .then((response) => {
                if(response.data.success == true)
                {
                    alert(response.data.message)
                    this.promotion = {}
                    this.banner = null
                }
                else
                {
                    alert(response.data.message)
                }
            }).catch(() => {
                alert('Lỗi hệ thống')
            })
        }
    },
    created() {
        // this.$http.get(this.$store.state.API_URL + 'karaoke?api_token='+this.$cookies.get('token')).then((response) => {
        //     this.karaokes = response.data
        // })
        this.api_promotion()
    },
}
</script>

<style scoped>
.banner {position: relative;}
.banner:hover i.upload{opacity: 1;}
.upload {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 999;opacity: 0;}
input.upload {opacity: 0;cursor: pointer;width: 100%;height: 100%;}
.list-karaoke li{list-style: none;padding: 5px 10px;}
.list-karaoke li:first-child {padding-left: none;}
.list-karaoke {display: inline-block;}
</style>