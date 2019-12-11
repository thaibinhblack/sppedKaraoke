<template>
<div id="detail-room">
    <header-tool-bar />
    
    <hooper class="slider" style="height:375px" :settings="hooperSettings" v-model="slider">
        <slide v-for="(img,index) in images" :key="index" :index="index">
            <v-col cols="12" sm="12" style="padding:3px;">
                <v-img :src="img.url" @click="imageView(index)" height="375px"></v-img>
            </v-col>
        </slide>
        <slide index="0">
            <v-col cols="12" sm="12" style="padding:3px">
                <v-img :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM" height="375px" width="auto"></v-img>
            </v-col>
        </slide>
    </hooper>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="12" class="group-link" style="text-align:left;" v-if="check == true">
                 <star-rating  v-model="rating_room" :star-size="35" :show-rating="false" inactive-color="#e2e2e2 " active-color="#f65e39"></star-rating>
                 
            </v-col>
            <v-col cols="12" sm="8" md="7">
                <h2>{{karaoke.NAME_BAR_KARAOKE}} - {{room.NAME_ROOM_BAR_KARAOKE}}   </h2>
                <star-rating :inline="true" :star-size="15" :read-only="true" :show-rating="false" :rating="room.STAR_RATING"></star-rating> <small>({{room.NUMBER_RATED}}), {{room.VIEW_ROOM + 1}} lượt xem</small>
                <p v-html="room.CONTENT"></p>
                <v-row>
                    <p>Bình luận</p>
                    <v-col cols="12" sm="12">
                            nội dung comment
                    </v-col>
                </v-row>
            </v-col>
            
            <v-col cols="12" sm="5" md="4" class="left-layout">
                <v-card class="booking">
                    <v-card-title primary-title>
                        <p style="text-align:left;width:100%;margin-bottom:0;font-weight:bold;font-size:28px;">{{room.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} <small style="margin-left:4px;font-size:13px;"> vnđ/h</small></p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                           <v-col cols="12" sm="12">
                                <p><strong>Thiết kế: </strong> {{room.DESIGN}}</p>
                                <p><strong>Sức chứa: </strong> {{room.CAPACITY}}</p>
                                <p><strong>Phòn mới: </strong> {{room.NEW_ROOM == 1 ? 'còn mới' : 'cũ'}}</p>
                                <p><strong>Hỗ trợ tổ chức sự kiện: </strong> {{room.EVENT == 1 ? 'có' : 'không'}}</p>
                                <p v-for="(attribute,index) in attributes" :key="index">
                                    <strong>{{attribute.NAME_ATTRIBUTE}}</strong>
                                    {{attribute.CONTENT_ATTRIBUTE}}
                                </p>
                                <v-row>
                                  <v-col cols="12" sm="12"  v-if="user_booking == -1 || user_booking == 4 || user_booking == 3 || user_booking == 5">
                                    <vue-timepicker v-model="time_start" format="hh:mm:ss" style="width:100%;margin-top:17px"></vue-timepicker>
                                 </v-col>
                                </v-row>
                                <div v-if="$cookies.isKey('token')">
                                    <v-text-field
                                        v-if="user_booking == 0 || user_booking == 1 || user_booking == 2"
                                        name="TIME_START"
                                        label="Thời gian đặt phòng"
                                        v-model="booking_thanhtoan.TIME_START"
                                        disabled=""
                                    ></v-text-field>
                                    <button v-if="user_booking == -1 || user_booking == 4 || user_booking == 3 || user_booking == 5"  class="btn btn-booking" @click="bookingRoom()">Đặt phòng ngay</button>
                                    <button v-if="user_booking == 0 || user_booking == 1" class="btn btn-booking" @click="cancle()">Hủy đặt phòng</button>
                                    <button v-if="user_booking == 2" class="btn btn-booking" @click="dialog_thanhtoan = true">Thanh toán</button>
                                </div>
                                <div v-else>
                                    <button v-if="user_booking == 1 || user_booking == 2 " class="btn btn-booking" >Đã có người đặt phòng</button>
                                    <button v-else class="btn btn-booking" @click="bookingRoom()">Đặt phòng ngay</button>
                                    
                                </div>
                                <v-list-item two-line style="margin-top:15px">
                                    <v-list-item-avatar>
                                        <v-avatar
                                            size="80px"
                                            color="#e2e2e2"
                                        >
                                            <img :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" alt="alt">
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-title>
                                        <h2 class="name-bar-karaoke">{{karaoke.NAME_BAR_KARAOKE}}</h2>
                                    </v-list-item-title>
                                    
                                </v-list-item>
                                <P align="center" style="margin-top:15px;"><small>Tham gia ngày: {{karaoke.CREATED_AT}}</small></P>
                           </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-overlay :value="$store.state.loading" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
        <v-dialog v-model="dialog_thanhtoan" persistent max-width="600px">
            <v-card v-if="booking_thanhtoan.STATUS == 2">
                <form action="" style="padding:15px;" @submit.prevent="api_thanh_toan_trcutiep()">
                    <h3>Thông tin thanh toán</h3>
                    <v-text-field
                        name="TIME_START"
                        label="Thời gian đặt phòng"
                        v-model="booking_thanhtoan.TIME_START"
                        disabled
                    ></v-text-field>

                </form>
            </v-card>
        </v-dialog>
</div>
</template>

<script>
import moment from 'moment'
import { Hooper, Slide } from 'hooper';
import VueTimepicker from 'vue2-timepicker'

export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        Hooper, Slide,
        VueTimepicker
    },
    data()
    {
        return {
            room: {},
            images: [],
            hooperSettings: {
                UUID_ROOM_BAR_KARAOKE: "671061d1-ae46-4457-8cd9-deddf978072d",
                itemsToShow: 0,
                centerMode: true,
                breakpoints: {
                991:
                {
                    centerMode: false,
                    itemsToShow: 3
                },
                765: {
                    centerMode: false,
                    itemsToShow: 2
                },
                564: {
                    itemsToShow: 1,
                    pagination: 'fraction'
                }
                }
            },
            slider: 0,
            karaoke: {},
            attributes: [],
            booking: false,
            message_booking: '',
            user_booking: -1,
            date: new Date().toISOString().substr(0, 10),
            today: this.formatDate(new Date().toISOString().substr(0,10)),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            rating_room: 0,
            check: true,
            time_start: {
               
            },
            events: [
                {
                name: 'Vacation',
                start: '2018-12-30',
                end: '2019-01-02',
                },
            ],
            dialog_thanhtoan: false,
            booking_thanhtoan: {
                RENT_COST: 0
            }
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
      rating_room(newVal)
      {
          if(newVal > 0 )
          {
              if(this.$cookies.isKey('token'))
              {
                  this.axios.get(this.$store.state.API_URL + 'room/'+this.$route.params.UUID_ROOM_BAR_KARAOKE+'/rating?api_token='+this.$cookies.get('token')+'&rating='+newVal)
                  .then((response) => {
                      this.room.STAR_RATING = ((this.room.STAR_RATING * this.room.NUMBER_REATED ) + newVal) / (this.room.NUMBER_REATE +1)
                      this.room.NUMBER_REATE = this.room.NUMBER_REATE +1 
                      this.check = false
                      alert('Cảm ơn bạn đã đánh giá phòng của chúng tôi')
                  })
              } 
              else
              {
                  this.$router.push('/login')
              }
          }
      }
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        formatDate_check (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}/${month}/${day}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        ApiGetKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.safeurl).then((response) => {
                this.karaoke = response.data
            })
            this.$store.state.loading = false
        },
        ApiGetRoom()
        {
            this.$store.state.loading = true
            this.$http.get(this.$store.state.API_URL + 'room/'+this.$route.params.UUID_ROOM_BAR_KARAOKE).then(async (response) => {
                this.room =  response.data
               
            })
            // console.log('room',this.room)
            // console.log(this.room.UUID_ROOM_BAR_KARAOKE)
           
            this.$store.state.loading = false
        },
        ApiGetMedia(UUID)
        {
            console.log(UUID)
            this.$http.get(this.$store.state.API_URL + 'image/'+UUID+'?type=UUID_ROOM_BAR_KARAOKE').then((response) => {
                const photos = []
                response.data.forEach((image) => {
                    const url_image = image.TYPE == 'firebase'? image.URL_IMAGE: this.$store.state.PUBLIC_URL + image.URL_IMAGE;
                    console.log(url_image)
                    photos.push({
                        name: image.UUID_IMAGE,
                        url: url_image
                    })
                })
                this.images = photos
                this.$imageViewer.images(this.images);
            })
        },
        ApiGetAttribute(UUID)
        {
            this.$http.get(this.$store.state.API_URL + 'attribute-room?UUID_ROOM_BAR_KARAOKE='+UUID).then((response) => {
                this.attributes = response.data
            })
        },
        
        ApiGetBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'check_booking?api_token='+this.$cookies.get('token')+'&status=check&UUID_ROOM_BAR_KARAOKE='+this.$route.params.UUID_ROOM_BAR_KARAOKE).then((response) => {
                this.user_booking = response.data.STATUS
                this.booking_thanhtoan = response.data
                if(response.data.TIME_START)
                {
                    this.time_start.hh = response.data.TIME_START.slice(0,2)
                    this.time_start.mm = response.data.TIME_START.slice(3,5)
                    this.time_start.ss = '00'
                    console.log(this.time_start)
                }
            })
            
        },
        bookingRoom()
        {
            // this.$store.state.loading = true
            if(!this.$cookies.isKey('token'))
            {
                this.$router.push('/login')
            }
            else
            {
                const data = new FormData()
                const time = new Date()
                // time = moment(time).format('MMMM Do YYYY, h:mm:ss a')
                // console.log(moment(time).format('YYYY-DD-MM, h:mm:ss'))
                // data.append
                if(this.time_start.hh && this.time_start.mm)
                {
                    data.append("DATE_BOOK",new Date().getFullYear() + '-' + (new Date().getMonth() +1) + '-' + new Date().getDate())
                    data.append("TIME_START",this.time_start.hh+':'+this.time_start.mm+':00')
                    data.append("UUID_ROOM_BAR_KARAOKE",this.room.UUID_ROOM_BAR_KARAOKE)
                    data.append("UUID_BAR_KARAOKE",this.room.UUID_BAR_KARAOKE)
                    console.log(this.time_start,new Date().getUTCHours(), new Date().getTimezoneOffset())
                    // data.append("TIME_START",)
                    this.$http.post(this.$store.state.API_URL +'bookingmobile?api_token='+this.$cookies.get('token'),data).then((response) => {
                      
                        this.ApiGetBooking()
                        alert('Đặt phòng thành công')
                        
                    })
                }else
                {
                    alert('Bạn chưa nhập thời gian dặt phòng')
                }
            }
            // this.$store.state.loading = false
            //  this.$socket.client.emit('emit_method', val);
            // this.$socket.client.emit('booking','hello booking')
            // this.$socket.emit('emit_method', data)
        },
        cancle()
        {
             this.axios.get(this.$store.state.API_URL + 'cancle?api_token='+this.$cookies.get('token')+'&UUID_ROOM_BAR_KARAOKE='+this.$route.params.UUID_ROOM_BAR_KARAOKE).then(() => {
                 this.user_booking = -1
            })
        },
        imageView(index) {
            this.$imageViewer.index(index);
            this.$imageViewer.show();
        },
        check_rating()
        {
            if(this.$cookies.isKey('token'))
            {
                this.axios.get(this.$store.state.API_URL + 'check_rating/'+this.$route.params.UUID_ROOM_BAR_KARAOKE+'?type=UUID_ROOM_BAR_KARAOKE&api_token='+this.$cookies.get('token'))
                .then((response) => {
                    console.log(response.data)
                    this.check = response.data.rating
                })
            }
        },
        api_view()
        {
            this.axios.get(this.$store.state.API_URL + 'room/'+this.$route.params.UUID_ROOM_BAR_KARAOKE+'/view')
        },
        api_get_booking(date)
        {
           
            this.axios.get(this.$store.state.API_URL + 'get_booking/'+this.$route.params.UUID_ROOM_BAR_KARAOKE+'?DATE_BOOK='+date).then((response) => {
                console.log(response.data)
                const date_book = []
                response.data.forEach((book) => {
                    date_book.push({
                        name: book.DISPLAY_NAME,
                        start: book.DATE_BOOK,
                        end: book.DATE_BOOK
                    })
                })
                this.events = date_book
            })
        }
    },
    created()
    {
       
        this.ApiGetKaraoke()
        this.ApiGetRoom()
        this.ApiGetBooking()
        this.ApiGetMedia(this.$route.params.UUID_ROOM_BAR_KARAOKE)
        this.ApiGetAttribute(this.$route.params.UUID_ROOM_BAR_KARAOKE)
        this.check_rating()
        this.api_view()
        this.api_get_booking(new Date().toISOString().substr(0, 10))
        //  console.log(this.time_start)
    }
}
</script>

<style scoped>
#detail-room {background: #fff;}
.slider {outline: none}
.btn-booking {
    background-image: linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)!important;
    width: 100%;
    padding: 15px;
    color: #fff;
}
.name-bar-karaoke {font-size: 20px;font-weight: bold;margin-left: 15px}

.left-layout {position: relative;}
.booking {padding: 25px;}
</style>