<template>
<div id="page-booking" style="padding:15px;">
    <v-row>
        <v-col cols="12" sm="12">
            Danh sách booking
        </v-col>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="bookings"
                    >
                        <template v-slot:item.AVATAR="{item}">
                            <v-avatar
                                size="70px"
                                color="#e2e2e2"
                            >
                                <img v-if="item.AVATAR != null" :src="$store.state.PUBLIC_URL + item.AVATAR" alt="alt">
                            </v-avatar>
                        </template>
                        <template v-slot:item.GENDER="{item}">
                            <v-icon v-if="item.GENDER == 1 ">mdi-gender-male</v-icon>
                            <v-icon v-else>mdi-gende-female</v-icon>
                        </template>
                        <template  v-slot:item.STATUS="{item}">
                            <span v-if="item.STATUS == 0">Đã đặt</span>
                            <span v-if="item.STATUS == 1">Đã nhận</span>
                            <span v-if="item.STATUS == 2">Thanh toán</span>
                            <span v-if="item.STATUS == 3">Hủy</span>
                        </template>
                        <template v-slot:item.ACTIONS="{item}">
                            <button @click="update = item.UUID_USER"><v-icon>mdi-pencil</v-icon></button>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data()
    {
        return {
            bookings: [],
            headers: [
                
                {text: 'AVATAR', value: 'AVATAR', align: 'center', sortable: false},
                {text: 'TÊN', value: 'DISPLAY_NAME', align: 'center'},
                {text: 'GIỚI TÍNH', value: 'GENDER', align: 'center', sortable: false},
                {text: 'NGÀY SINH', value: 'BIRTH_DAY'},
                {text: 'SĐT', value: 'PHONE'},
                {text: 'EMAIL', value: 'EMAIL'},
                {text: 'PHÒNG', value: 'NAME_ROOM_BAR_KARAOKE'},
                {text: 'ĐIỂM BOOKING', value: 'RELIABILITY', align: 'center'},
                {text: 'SL BOOK', value: 'NUMBER_BOOK', align: 'center'},
                {text: 'SL HỦY', value: 'CANCLE_BOOK', align: 'center'},
                {text: 'TGIAN BOOK', value: 'CREATED_AT'},
                {text: 'TRẠNG THÁI', value: 'STATUS'},
                {text: '', value: 'ACTIONS'}

            ],
            update: null
        }
    },
    watch:{
        getStore()
        {
            this.ApiGetBooking()
        }
    },
    computed: {
        ...mapGetters(["getStore"])
    },
    methods: {
        async ApiGetBooking()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$session.get('token')+'&UUID_BAR_KARAOKE='+this.getStore)
            .then((response) => {
                console.log(response.data)
                this.bookings = response.data
            })
            this.$store.state.loading = false
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>