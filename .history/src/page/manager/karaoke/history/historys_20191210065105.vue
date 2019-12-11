<template>
    <div id="page-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                DANH SÁCH LỊCH SỬ NGƯỜI DÙNG
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-card"> Lịch sử người dùng</span>
                            </v-col>
                        </v-row>
                        
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="historys"
                        >
                            <template v-slot:item.AVATAR="{item}">
                                <v-avatar
                                    size="avatarSize"
                                    color="red"
                                    size="70px"
                                >
                                    <img :src="$store.state.PUBLIC_URL + item.AVATAR" alt="alt">
                                </v-avatar>
                                <!-- <v-img :src=""></v-img> -->
                            </template>
                        </v-data-table>
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
            headers: [
                {text: 'AVATAR', value: 'AVATAR', align: 'center',sortable: false},
                {text: 'Họ & Tên', value: 'DISPLAY_NAME'},
                {text: 'Thuộc chi nhánh',value: 'NAME_BAR_KARAOKE'},
                {text: 'Thao tác', value: 'NAME_HISTORY'},
                {text: 'Nội dung', value: 'CONTENT_ACTION'},
                {text: 'Ngày thực hiện', value: 'CREATED_AT'}
            ],
            historys: []
        }
    },
    methods: {
        api_history()
        {
            this.axios.get(this.$store.state.API_URL + 'history?api_token='+this.$cookies.get("token")).then((response) => {
                console.log(response.data)
                this.historys = response.data
            })
        }
    },
    created() {
        this.api_history()
    },
}
</script>