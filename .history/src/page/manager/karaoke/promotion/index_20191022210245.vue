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
                {text: '', value: 'LOGO_BAR_KARAOKE', align: 'center', sortable: false},
                {text: 'Tên chi nhánh', value: 'NAME_BAR_KARAOKE'},
                {text: 'Tên khuyến mãi', value: 'NAME_PROMOTION'},
                {text: 'Khuyến mãi (%)', value: 'VALUE_SAFE_OFF',align: 'center'},
                {text: 'Ngày bắt đầu', value: 'TIME_START', sortable: false},
                {text: 'Ngày kết thúc', value: 'TIME_END', sortable: false}
            ]
        }
    }
}
</script>