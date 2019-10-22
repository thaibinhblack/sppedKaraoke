<template>
<div id="page-add-promotion" style="padding: 15px;">
    <v-row>
         <v-col cols="12" sm="4">
                Thêm khuyến mãi mới
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
            <v-card>
                <v-card-text>
                    <v-form>
                       <v-row>
                           <v-col cols="12" sm="12">
                                <v-img src="http://placehold.it/300x180/" width="100%" height="180px"></v-img>
                           </v-col>
                           <v-col cols="12" sm="6" md="4">
                               <v-text-field
                                   name="NAME_PROMOTION"
                                   label="Tên khuyến mãi"
                                   v-model="promotion.NAME_PROMOTION"
                                   prepend-icon="mdi-calendar-text-outline"
                                   placeholder="Nhập tên khuyến mãi"
                               ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                               <v-text-field
                                   name="VALUE_SAFE_OFF"
                                   label="Khuyến mãi (%)"
                                   v-model="promotion.VALUE_SAFE_OFF"
                                   prepend-icon="mdi-calendar-edit"
                                   placeholder="Nhập % khuyến mãi"
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
                                        v-model="dateFormatted"
                                        label="Ngày bắt đầu"
                                        hint="MM/DD/YYYY"
                                        persistent-hint
                                        prepend-icon="mdi-calendar-range"
                                        @blur="date = parseDate(dateFormatted)"
                                        required
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
                                        v-model="dateFormatted"
                                        label="Ngày kết thúc"
                                        hint="MM/DD/YYYY"
                                        persistent-hint
                                        prepend-icon="mdi-calendar-range"
                                        @blur="promotion.END = parseDate(dateFormatted)"
                                        required
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <label class="title-lable" style="font-weight:bold;margin-bottom:15px;">Nội dung khuyến mãi</label>
                                <vue-editor class="content" v-model="promotion.CONTENT_PROMOTION"></vue-editor>
                            </v-col>
                       </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <button class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
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
            promotion: {},
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false
                }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
    },
}
</script>