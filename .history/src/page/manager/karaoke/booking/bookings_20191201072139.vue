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
                                <span v-else-if="item.STATUS == 4">KH hủy dặt phòng</span>
                                 <span v-else-if="item.STATUS == 5">Hủy dặt phòng</span>
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
                            <span v-if="item.STATUS == 1" ><button @click="api_nhan_phong(item.UUID_BOOKING)" title="Nhận phòng"><v-icon>mdi-checkbox-marked</v-icon></button></span>
                            <span v-if="item.STATUS == 2" ><button @click="api_thanh_toan(item.UUID_BOOKING)" title="Thanh toán"><v-icon>mdi-cash</v-icon></button></span>
                            <span style="margin-left: 10px"  v-if="item.STATUS == 0 || item.STATUS == 1"><button @click="api_huy_book(item.UUID_BOOKING)" title="Hủy"><v-icon>mdi-close-box-multiple-outline</v-icon></button></span>
                            <!-- <span style="margin-left: 10px"  v-if="item.STATUS == 0"><button @click="api_huy_book(item.UUID_BOOKING)" title="Hủy"><v-icon>mdi-close-box-multiple-outline</v-icon></button></span> -->
                            <!-- <button v-if="update != item.UUID_USER" @click="update = item.UUID_USER"><v-icon>mdi-pencil</v-icon></button>
                            <button v-else @click="UpdateBooking(item)"><v-icon>mdi-check</v-icon></button> -->
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog
        v-model="bill"
        :overlay="false"
        max-width="700px"
        transition="dialog-transition"
    >
       <v-card>
            <form action="" style="padding:15px;">
                <h3>Thông tin thanh toán</h3>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Tài khoản khách hàng</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.EMAIL}}
                    </div>
                </div>
                 <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Tên khách hàng</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.DISPLAY_NAME}}
                    </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Đặt phòng vào lúc</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.DATE_BOOK}}, {{booking_thanhtoan.TIME_START}}
                    </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Thời gian thanh toán</strong></label>
                    <div class="col-sm-7">
                        {{total}}
                    </div>
                </div>
            </form>
       </v-card>
    </v-dialog>
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
                {text: 'Chi nhánh  ', value: 'NAME_BAR_KARAOKE'},
                {text: 'Phòng', value: 'NAME_ROOM_BAR_KARAOKE', align: 'center'},
                {text: 'Giá thuê/h', value: 'RENT_COST', align: 'center'},
                {text: 'Điểm', value: 'RELIABILITY', align: 'center'},
                {text: 'SL book', value: 'NUMBER_BOOK', align: 'center'},
                {text: 'SL hủy', value: 'CANCLE_BOOK', align: 'center'},
                {text: 'Thời gian book', value: 'TIME_START'},
                {text: 'Thời gian trả phòng', value: 'TIME_END'},
                {text: 'Trạng thái', value: 'STATUS'},
                {text: 'Ngày đặt', value: 'CREATED_AT'},
                {text: 'Tác vụ', value: 'ACTIONS',width: '100px'}
            ],
            update: null,
            statuss: [
                {text: 'Chờ duyệt', value: 0},
                {text: 'Đã duyệt', value: 1},
                {text: 'Nhận phòng', value: 2},
                {text: 'Thanh toán', value: 3},
                {text: 'Hủy', value: 4},
            ],
            status: 0,
            bill: false,
            booking_thanhtoan: {},
            time_end: new Date().getFullYear() +'-'+(new Date().getMonth()+1)+'-'+new Date().getDate() +', '+ new Date().getHours()+':'+new Date().getMinutes()+':00',

        }
    },
    watch:{
        getStore()
        {
            this.ApiGetBooking()
        }
    },
    computed: {
        ...mapGetters(["getStore"]),
        total(){
            if(this.bill == true)
            {
                const year = new Date(this.booking_thanhtoan.DATE_BOOK).getFullYear()
                const month = new Date(this.booking_thanhtoan.DATE_BOOK).getMinutes() + 1;
                const day = new Date(this.booking_thanhtoan.DATE_BOOK).getDate()
                const hours = this.booking_thanhtoan.TIME_START.slice(0,2)
                const minues = this.booking_thanhtoan.TIME_START.slice(3,5)
                console.log(((day*24*60) + (hours * 60) + minues),  ((new Date().getDate() *24*60) + (new Date().getHours() * 60) + (new Date().getMinutes())))
                return ((day*24*60) + (hours * 60) + minues) - ((new Date().getDate() *24*60) + (new Date().getHours() * 60) + (new Date().getMinutes()))
                // return  new Date(year,month,day,hours,minues,0,0).getTime() - new Date().getTime()
            }
            return 0
        }
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
                alert(response.data.message)
                this.ApiGetBooking()
            })
        },
        api_huy_book(id)
        {
             this.axios.post(this.$store.state.API_URL + 'booking/'+id+'/huy?api_token='+this.$cookies.get('token')).then((response) => {
                alert(response.data.message)
                this.ApiGetBooking()
            })
        },
        api_nhan_phong(id)
        {
            
             this.axios.post(this.$store.state.API_URL + 'booking/'+id+'/nhan?api_token='+this.$cookies.get('token')).then((response) => {
                alert(response.data.message)
                this.ApiGetBooking()
            })
        },
        api_thanh_toan(id)
        {
            this.bill = true
            this.booking_thanhtoan = this.bookings.filter((value,index,array) => {
                return  array[index].UUID_BOOKING == id
            })[0]
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>