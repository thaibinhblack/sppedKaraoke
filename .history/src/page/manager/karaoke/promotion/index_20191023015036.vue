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
                {text: 'Số chi nhánh áp dụng', value: 'total'},
                {text: 'Ngày bắt đầu', value: 'DATE_STARTED', sortable: false},
                {text: 'Ngày kết thúc', value: 'DATE_END', sortable: false},
                {text: 'Ngày tạo', value: 'CREATED_AT', sortable: false},
                {text: 'Tác vụ', value: 'ACTION',sortable: false, align: 'center'}
            ],
            promotions: []
        }
    },
    created() {
        this.$http.get(this.$store.state.API_URL +'promotion?api_token='+this.$session.get('token')).then((response) => {
            this.promotions = response.data
        })
    },
}
</script>