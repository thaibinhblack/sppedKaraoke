<template>
<div id="page-booking" style="padding:15px;">
    <v-row>
        <v-col cols="12" sm="12">
            Danh sách booking
        </v-col>
         <v-col cols="12" sm="12">
            <button class="btn-add" @click="dialog_form_book = true"><v-icon>mdi-plus</v-icon> Đặt phòng</button>
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
                            <span v-if="item.STATUS == 3" ><button @click="detail_bill(item.UUID_BILL)" title="Chi tiết hóa đơn">Chi tiết</button></span>
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
        persistent
        transition="dialog-transition">
       <v-card>
            <form action="" style="padding:15px;" @submit.prevent="api_thanh_toan_trcutiep()">
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
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Tên chi nhánh</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.NAME_BAR_KARAOKE}}
                    </div>
                </div>
                 <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Tên phòng</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.NAME_ROOM_BAR_KARAOKE}}
                    </div>
                </div>
                 <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Giá</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ/h
                    </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Đặt phòng vào lúc</strong></label>
                    <div class="col-sm-7">
                        {{booking_thanhtoan.DATE_BOOK}}, {{booking_thanhtoan.TIME_START}} 
                    </div>
                </div>
                 <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Thanh toán vào lúc</strong></label>
                    <div class="col-sm-7">
                        {{time_end}} 
                    </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Tổng gian thuê</strong></label>
                    <div class="col-sm-7">
                        {{total}} phút
                    </div>
                </div>
                <div class="form-group row">        
                    <label for="inputPassword3" class="col-sm-5 col-form-label" ><strong>Thành tiền</strong></label>
                    <div class="col-sm-7">
                        {{((booking_thanhtoan.RENT_COST/60) * total).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }} vnđ
                    </div>
                </div>
                 <div class="form-group row">
                    <div class="col-sm-9">
                    
                        <button  type="submit" class="btn btn-primary btn-form btn-add" >Thanh toán</button>
                    </div>
                </div>
            </form>
       </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog_detail_bill"
        persistent :overlay="false"
        max-width="700px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title primary-title>
                Chi tiết hóa đơn
            </v-card-title>
            <v-card-text>
                <hoadon-booking :bill="bill_booking"/>
            </v-card-text>
            <v-card-actions>
                  <button class="btn-add" type="submit" @click="dialog_detail_bill = false"><v-icon>mdi-close</v-icon> Đóng</button>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog_form_book"
        persistent :overlay="false"
        max-width="600px"
        transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                 Form đặt phòng
            </v-card-title>
            <v-card-text>
               <form @submit.prevent="booking_now()">
                    <v-row>
                        <v-col cols="12" sm="12" md="6">
                            <v-select
                                :items="karaokes"
                                v-model="booking_new.UUID_BAR_KARAOKE"
                                item-value="UUID_BAR_KARAOKE"
                                item-text="NAME_BAR_KARAOKE"
                                label="Danh sách chi nhánh"
                                @change="api_room_by()"
                                required
                            ></v-select>
                            <v-select
                                :items="room_by"
                                item-value="UUID_ROOM_BAR_KARAOKE"
                                item-text="NAME_ROOM_BAR_KARAOKE"
                                v-model="booking_new.UUID_ROOM_BAR_KARAOKE"
                                label="Danh sách phòng"
                                required
                            ></v-select>
                            <v-text-field
                                name="TIME_BOOK"
                                label="Thời gian đặt phòng"
                                id="time_book"
                                v-model="booking_new.NOW"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="booking_new.NAME_USER"
                                name="NAME_CUSTOMER"
                                label="Tên khách hàng"
                                id="customer"
                                prepend-icon="mdi-account-details"
                            ></v-text-field>
                            <v-text-field
                                v-model="booking_new.PHONE_USER"
                                name="PHONE_CUSTOMER"
                                label="SĐT khách hàng"
                                id="phone_customer"
                                prepend-icon="mdi-phone"
                            ></v-text-field>
                             <button type="button" class="btn-add" style="float:right;margin-top:10px;" @click="dialog_form_book = false">Đóng</button>
                            <button type="submit" class="btn-add" style="float:right;margin-top:10px;">Đặt ngay</button>
                        </v-col>
                    </v-row>
               </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueTimepicker from 'vue2-timepicker'

export default {
    components: {
        'hoadon-booking': () => import ('@/components/manager/hoadon/hoadon_booking.vue'),
        VueTimepicker
    },
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
            booking_thanhtoan: {
                RENT_COST: 0
            },
            end: new Date().getHours()+':'+new Date().getMinutes()+':00',
            time_end: new Date().getFullYear() +'-'+(new Date().getMonth()+1)+'-'+new Date().getDate() +', '+ new Date().getHours()+':'+new Date().getMinutes()+':00',
            dialog_detail_bill: false,
            bill_booking: {},
            dialog_form_book: false,
            karaokes: [],
            room_by: [],
            booking_new: {
                    TIME_START: new Date().getHours() + ':'+ new Date().getMinutes(),
                    DATE_BOOK: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' +  new Date().getDate(),
                    NOW:   new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear() +', '+ new Date().getHours() + ':'+ new Date().getMinutes() ,
            },

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
                console.log(day, hours, minues, ((day*24*60) + (hours * 60) + minues),  ((new Date().getDate() *24*60) + (new Date().getHours() * 60) + (new Date().getMinutes())))
                return ((new Date().getDate() *24*60) + (new Date().getHours() * 60) + (new Date().getMinutes())) - ((Math.floor(day)*24*60) + (Math.floor(hours) * 60) + Math.floor(minues))
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
        },
        api_thanh_toan_trcutiep()
        {
            const form_booking = new FormData();
            form_booking.append("TIME_END",this.end)
            form_booking.append("UUID_BAR_KARAOKE",this.booking_thanhtoan.UUID_BAR_KARAOKE)
            const PRICE_BILL = Math.floor(this.booking_thanhtoan.RENT_COST/60) * Math.floor(this.total)
            form_booking.append("PRICE_BILL", PRICE_BILL)
            form_booking.append("UUID_BOOKING",this.booking_thanhtoan.UUID_BOOKING)
            form_booking.append("TOTAL_TIME",this.total)
            form_booking.append("RENT_COST",this.booking_thanhtoan.RENT_COST)
            form_booking.append("NAME_BAR_KARAOKE",this.booking_thanhtoan.NAME_BAR_KARAOKE)
            form_booking.append("NAME_ROOM_BAR_KARAOKE",this.booking_thanhtoan.NAME_ROOM_BAR_KARAOKE)
            form_booking.append("CODE_PROMOTION","")
            form_booking.append("PAYPAL",1)
            form_booking.append("UUID_USER",this.booking_thanhtoan.UUID_USER)
             this.axios.post(this.$store.state.API_URL + 'thanhtoan?api_token='+this.$cookies.get('token'),form_booking).then((response) => {
                alert(response.data.message)
                this.ApiGetBooking()
            })  
        },
        detail_bill(UUID_BILL)
        {
            this.dialog_detail_bill = true
            this.axios.get(this.$store.state.API_URL + 'bill/'+UUID_BILL).then((response => {
                this.bill_booking = response.data
            }))
        },
        api_karaokes()
        {
            this.axios.get(this.$store.state.API_URL + 'manager/karaoke?api_token='+this.$cookies.get('token')).then((response) => {
                this.karaokes = response.data
            })
        },
        api_room_by()
        {   
            this.axios.get(this.$store.state.API_URL + 'room?UUID_BAR_KARAOKE='+this.booking_new.UUID_BAR_KARAOKE).then((response) => {
                this.room_by = response.data
            })
        },
        booking_now()
        {
            const form_book = new FormData()
            form_book.append("DISPLAY_NAME", this.booking_new.NAME_USER)
            form_book.append("PHONE_USER",this.booking_new.PHONE_USER)
            form_book.append("UUID_BAR_KARAOKE",this.booking_new.UUID_BAR_KARAOKE)
            form_book.append("UUID_ROOM_BAR_KARAOKE",this.booking_new.UUID_ROOM_BAR_KARAOKE)
            form_book.append("TIME_START",this.booking_new.TIME_START)
            form_book.append("DATE_BOOK",this.booking_new.DATE_BOOK)
            this.axios.post(this.$store.state.API_URL + 'booking/them_truc_tiep?api_token='+this.$cookies.get('token'),form_book).then((response) => {
                console.log(response.data)
                alert(response.data.message)
            })
        }
    },
    created()
    {
        this.ApiGetBooking()
        this.api_karaokes()
    }
}
</script>