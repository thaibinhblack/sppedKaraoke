<template>
<div id="detail-room">
    <header-tool-bar />
    
    <hooper class="slider" style="height:375px" :settings="hooperSettings" v-model="slider">
        <slide v-for="(img,index) in images" :key="index" :index="index">
            <v-col cols="12" sm="12" style="padding:3px;">
                <v-img :src="$store.state.PUBLIC_URL + img.URL_IMAGE" height="375px"></v-img>
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
                <ul class="list-link">
                    <li>{{karaoke.NAME_PROVINCE}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.NAME_DISTRICT}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.ADDRESS_BAR_KARAOKE}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{room.NAME_ROOM_BAR_KARAOKE}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="8" md="7">
                <h2>{{karaoke.NAME_BAR_KARAOKE}} - {{room.NAME_ROOM_BAR_KARAOKE}}</h2>
                <p v-html="room.CONTENT"></p>
                <fb-comment data-width="100%" width="100%" :url="$store.state.DOMAIN + $route.params.safeurrl +'/'+$route.params.name_room" />
            </v-col>
            <v-col cols="12" sm="5" md="4" class="left-layout">
                <v-card class="booking">
                    <v-card-title primary-title>
                        <p style="text-align:left;width:100%;margin-bottom:0;font-weight:bold">{{room.RENT_COST}},000 <small style="margin-left:4px;font-size:13px;"> vnđ/h</small></p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                           <v-col cols="12" sm="12">
                                <p><strong>Sức chứa tối đa: </strong> {{room.CAPACITY}} người/phòng</p>
                                <p v-for="(attribute,index) in attributes" :key="index">
                                    <strong>{{attribute.NAME_ATTRIBUTE}}</strong>
                                    {{attribute.CONTENT_ATTRIBUTE}}
                                </p>
                                <button v-if="booking == false" class="btn btn-booking" @click="bookingRoom()">Đặt phòng ngay</button>
                                <button v-else class="btn btn-booking" disabled>
                                    
                                        Phòng đã được đặt <br />
                                        <small color="#fff">Đặt vào lúc: {{TIME_START}}</small></button>
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
            TIME_START: null
        }
    },
    methods: {
        ApiGetKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.safeurl).then((response) => {
                this.karaoke = response.data
            })
            this.$store.state.loading = false
        },
        async ApiGetRoom()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'room?URL_SAFE='+this.$route.params.safeurl
            +'&NAME_ROOM_BAR_KARAOKE='+this.$route.params.name_room).then(async (response) => {
                this.room = await response.data
                await this.ApiGetBooking()
                await this.ApiGetMedia(response.data.UUID_ROOM_BAR_KARAOKE)
                await this.ApiGetAttribute(response.data.UUID_ROOM_BAR_KARAOKE)
                await this.ApiGetStatus(response.data.UUID_ROOM_BAR_KARAOKE)
            })
            // console.log('room',this.room)
            // console.log(this.room.UUID_ROOM_BAR_KARAOKE)
           
            this.$store.state.loading = false
        },
        ApiGetMedia(UUID)
        {
            console.log(UUID)
            this.$http.get(this.$store.state.API_URL + 'image/'+UUID+'?type=UUID_ROOM_BAR_KARAOKE').then((response) => {
                this.images = response.data
            })
        },
        ApiGetAttribute(UUID)
        {
            this.$http.get(this.$store.state.API_URL + 'attribute-room?UUID_ROOM_BAR_KARAOKE='+UUID).then((response) => {
                this.attributes = response.data
            })
        },
        ApiGetStatus(UUID)
        {
            this.$http.get(this.$store.state.API_URL + 'booking/'+UUID+'/show?status=1').then((response) => {
                if(response.data.success == true)
                {
                    this.booking = true
                    this.TIME_START = response.data.data.TIME_START
                }
            })
        },
        ApiGetBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$session.get('token')+'&status=check&UUID_ROOM_BAR_KARAOKE='+this.room.UUID_ROOM_BAR_KARAOKE).then((response) => {
                if(response.data.booking == true)
                {
                    this.booking = false
                }
                else
                {
                    this.booking = true
                    this.TIME_START = response.data.data.CREATED_AT
                }
            })
        },
        async bookingRoom()
        {
            this.$store.state.loading = true
            if(!this.$session.has('token'))
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
                await this.$http.post(this.$store.state.API_URL +'booking?api_token='+this.$session.get('token'),data).then((response) => {
                    
                    
                })
            }
            this.$store.state.loading = false
            //  this.$socket.client.emit('emit_method', val);
            // this.$socket.client.emit('booking','hello booking')
            // this.$socket.emit('emit_method', data)
        }
    },
    created()
    {
       
        this.ApiGetKaraoke()
        this.ApiGetRoom()
    }
}
</script>

<style scoped>
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