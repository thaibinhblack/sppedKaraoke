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
            </v-col>
            <v-col cols="12" sm="5" md="4">
                <v-card>
                    <v-card-title primary-title>
                        <p style="text-align:center;">{{room.RENT_COST}},000 <small> vnđ/h</small></p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="2" md="3">

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
import { Hooper, Slide } from 'hooper';
export default {
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
            karaoke: {}
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
                await console.log(response.data.UUID_ROOM_BAR_KARAOKE)
                await this.ApiGetMedia(response.data.UUID_ROOM_BAR_KARAOKE)
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
</style>