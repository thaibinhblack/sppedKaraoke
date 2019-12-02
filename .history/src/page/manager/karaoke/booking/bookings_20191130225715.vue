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
                        <template>

                        </template>
                        <template  v-slot:item.STATUS="{item}">
                           <div v-if="update != item.UUID_USER">
                                <span v-if="item.STATUS == 0">Chờ duyệt</span>
                                <span v-else-if="item.STATUS == 1">Đã duyệt</span>
                                <span v-else-if="item.STATUS == 2">Nhận phòng</span>
                                <span v-else-if="item.STATUS == 3">Đã thanh toán</span>
                                <span v-else>Hủy</span>
                           </div>
                           <v-select v-else
                               :items="statuss"
                               item-text="text"
                               item-value="value"
                               v-model="status"
                               label="TRẠNG THÁI"
                           ></v-select>
                        </template>
                        <template v-slot:item.ACTIONS="{item}">
                            <span v-if="item.STATUS == 0" ><button @click="api_duyet_book(item.UUID_BOOKING)" title="Duyệt"><v-icon>mdi-checkbox-marked-outline</v-icon></button></span>
                            <span style="margin-left: 10px"  v-if="item.STATUS == 0"><button @click="api_huy_book()" title="Hủy"><v-icon>mdi-close-box-multiple-outline</v-icon></button></span>
                            <!-- <button v-if="update != item.UUID_USER" @click="update = item.UUID_USER"><v-icon>mdi-pencil</v-icon></button>
                            <button v-else @click="UpdateBooking(item)"><v-icon>mdi-check</v-icon></button> -->
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
                {text: 'Tên', value: 'DISPLAY_NAME', align: 'center'},
                {text: 'SĐT', value: 'PHONE'},
                {text: 'Email', value: 'EMAIL'},
                {text: 'Phòng', value: 'NAME_ROOM_BAR_KARAOKE', align: 'center'},
                {text: 'Giá thuê/h', value: 'RENT_COST', align: 'center'},
                {text: 'Điểm', value: 'RELIABILITY', align: 'center'},
                {text: 'SL book', value: 'NUMBER_BOOK', align: 'center'},
                {text: 'SL hủy', value: 'CANCLE_BOOK', align: 'center'},
                {text: 'Thời gian book', value: 'TIME_START'},
                {text: 'Thời gian trả phòng', value: 'TIME_END'},
                {text: 'Trạng thái', value: 'STATUS'},
                {text: 'Ngày đặt', value: 'CREATED_AT'},
                {text: 'Duyêt/hủy/thah toán', value: 'ACTIONS',width: '100px'}
            ],
            update: null,
            statuss: [
                {text: 'Chờ duyệt', value: 0},
                {text: 'Đã duyệt', value: 1},
                {text: 'Nhận phòng', value: 2},
                {text: 'Thanh toán', value: 3},
                {text: 'Hủy', value: 4},
            ],
            status: 0
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
            await this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$cookies.get('token'))
            .then((response) => {
                console.log(response.data)
                this.bookings = response.data
            })
            this.$store.state.loading = false
        },
        UpdateBooking(item)
        {
            this.$http.get(this.$store.state.API_URL + 'booking/'+item.UUID_BOOKING+'/check?api_token='+this.$cookies.get('token')+'&status='+this.status).
            then((response) => {
                this.update = null
                this.ApiGetBooking()
            })
        },
        api_duyet_book(id)
        {
            this.axios.post(this.$store.state.API_URL + 'booking/'+id+'/duyet?api_token='+this.$cookies.get('token')).then((response) => {
                console.log(response.data)
            })
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>