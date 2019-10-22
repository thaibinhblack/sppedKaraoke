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
                       </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            promotion: {}
        }
    }
}
</script>