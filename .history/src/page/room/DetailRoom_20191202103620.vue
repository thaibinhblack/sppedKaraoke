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
            <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                 <star-rating :star-size="35" inactive-color="#f65e39 " active-color="#f65e39"></star-rating>
            </v-col>
            <v-col cols="12" sm="8" md="7">
                <h2>{{karaoke.NAME_BAR_KARAOKE}} - {{room.NAME_ROOM_BAR_KARAOKE}}</h2>
                <p v-html="room.CONTENT"></p>
                <fb-comment data-width="100%" width="100%" :url="$store.state.DOMAIN + $route.params.safeurrl +'/'+$route.params.name_room" />
            </v-col>
            <v-col cols="12" sm="5" md="4" class="left-layout">
                <v-card class="booking">
                    <v-card-title primary-title>
                        <p style="text-align:left;width:100%;margin-bottom:0;font-weight:bold">{{room.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} <small style="margin-left:4px;font-size:13px;"> vnđ/h</small></p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                           <v-col cols="12" sm="12">
                               
                                <p v-for="(attribute,index) in attributes" :key="index">
                                    <strong>{{attribute.NAME_ATTRIBUTE}}</strong>
                                    {{attribute.CONTENT_ATTRIBUTE}}
                                </p>
                                 <v-col cols="12" sm="7" md="8">
                                     <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="dateFormatted"
                                            label="Thời gian đặt phòng"
                                          
                                            persistent-hint
                                            prepend-icon="mdi-calendar-range"
                                            @blur="date = parseDate(dateFormatted)"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                 </v-col>
                                <div v-if="$cookies.isKey('token')">
                                    <button v-if="user_booking == -1 || user_booking == 4" class="btn btn-booking" @click="bookingRoom()">Đặt phòng ngay</button>
                                    <button v-if="user_booking == 0 || user_booking == 1" class="btn btn-booking" @click="cancle()">Hủy đặt phòng</button>
                                    <button v-if="user_booking == 2" class="btn btn-booking" @click="paypal()">Thanh toán</button>
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
</div>
</template>

<script>
import moment from 'moment'
import { Hooper, Slide } from 'hooper';
export default {
    sockets: {
        connect: function () {
            this.$socket.emit("booking", "booking")
            console.log('socket connected')
        },
        booking: function(data)
        {
            console.log(data)
        }
    },
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        Hooper, Slide 
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
            TIME_START: null,
            message_booking: '',
            user_booking: -1,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
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
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
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
             this.$http.get(this.$store.state.API_URL + 'check_booking?api_token='+this.$cookies.get('token')+'&status=check&UUID_ROOM_BAR_KARAOKE='+this.room.UUID_ROOM_BAR_KARAOKE).then((response) => {
                this.user_booking = response.data.STATUS
                // console.log(response.data)
            })
            
        },
        async bookingRoom()
        {
            this.$store.state.loading = true
            if(!this.$cookies.isKey('token'))
            {
                this.$router.push('/login')
            }
            else
            {
                const data = new FormData()
                const time = new Date()
                // time = moment(time).format('MMMM Do YYYY, h:mm:ss a')
                console.log(moment(time).format('YYYY-DD-MM, h:mm:ss'))
                data.append("TIME_START",moment(time).format('YYYY-MM-DD h:mm:ss'))
                data.append("UUID_ROOM_BAR_KARAOKE",this.room.UUID_ROOM_BAR_KARAOKE)
                data.append("UUID_BAR_KARAOKE",this.karaoke.UUID_BAR_KARAOKE)
                // data.append("TIME_START",)
                await this.$http.post(this.$store.state.API_URL +'booking?api_token='+this.$cookies.get('token'),data).then((response) => {
                    this.ApiGetBooking()
                    
                })
            }
            this.$store.state.loading = false
            //  this.$socket.client.emit('emit_method', val);
            // this.$socket.client.emit('booking','hello booking')
            // this.$socket.emit('emit_method', data)
        },
        cancle()
        {
             this.axios.get(this.$store.state.API_URL + 'cancle?api_token='+this.$cookies.get('token')+'&UUID_ROOM_BAR_KARAOKE='+this.room.UUID_ROOM_BAR_KARAOKE).then(() => {
                 this.user_booking = -1
            })
        },
        imageView(index) {
            this.$imageViewer.index(index);
            this.$imageViewer.show();
        },
    },
    created()
    {
       
        this.ApiGetKaraoke()
        this.ApiGetRoom()
        this.ApiGetBooking()
        this.ApiGetMedia(this.$route.params.UUID_ROOM_BAR_KARAOKE)
        this.ApiGetAttribute(this.$route.params.UUID_ROOM_BAR_KARAOKE)
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