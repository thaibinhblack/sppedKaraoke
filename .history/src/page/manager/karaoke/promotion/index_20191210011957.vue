<template>
<div id="promotion" style="padding:15px;">
    <v-row>
         <v-col cols="12" sm="12">
            Danh sách khuyến mãi
        </v-col>
        <v-col cols="12" sm="12">
            <v-data-table
                :headers="headers"
                :items="promotions"
                
            >
                
                <template v-slot:item.ACTION="item">
                    <button><v-icon>mdi-pencil</v-icon></button>
                    <button><v-icon>mdi-chevron-right</v-icon></button>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            headers: [
        
                {text: 'Tên khuyến mãi', value: 'NAME_PROMOTION'},
                {text: 'Khuyến mãi (%)', value: 'VALUE_SAFE_OFF',align: 'center'},
                {text: 'Mã khuyến mãi', value: 'CODE_PROMOTION'},
                {text: 'Số lượng mã', value: 'NUMBER_PROMOTION'},
                {text: 'Số lượng đã sử dụng', value: 'USE_PROMOTION'}
                {text: 'Số chi nhánh áp dụng', value: 'total', align: 'center'},
                {text: 'Ngày bắt đầu', value: 'DATE_STARTED', sortable: false},
                {text: 'Ngày kết thúc', value: 'DATE_END', sortable: false},
                {text: 'Ngày tạo', value: 'CREATED_AT', sortable: false},
                {text: 'Tác vụ', value: 'ACTION',sortable: false, align: 'center'}
            ],
            promotions: []
        }
    },
    created() {
        this.$http.get(this.$store.state.API_URL +'promotion?api_token='+this.$cookies.get('token')).then((response) => {
            this.promotions = response.data
        })
    },
}
</script>