<template>
<div id="detail-karaoke">
    <header-tool-bar />
    <div class="banner-karaoke" v-if="karaoke.BANNER_BAR_KARAOKE != null">
        <v-img :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" width="100%" height="350px" aspect-ratio="1.7"></v-img>
    </div>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                <ul class="list-link">
                    <li>{{karaoke.NAME_PROVINCE}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.NAME_DISTRICT}}</li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.ADDRESS_BAR_KARAOKE}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="7" md="8">
                <h2 class="name-karaoke">{{karaoke.NAME_BAR_KARAOKE}}</h2>
                <P>
                    <v-icon color="yellow" size="22px" v-for="(star,i) in karaoke.STAR_RATING" :key="i">mdi-star</v-icon>
                    <span style="margin-left: 15px">({{karaoke.NUMBER_REATED}} đánh giá)</span>
                    <small style="margin-left: 15px;">{{karaoke.CREATED_AT}}</small>
                </P>
                <p><v-icon>mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</p>
                <p class="content" v-html="karaoke.CONTENT_BAR_KARAOKE"></p>
                 <fb-comment data-width="100%" width="100%" :url="$store.state.DOMAIN + karaoke.URL_SAFE" />
                <section>
                    <h3>Thư viện ảnh</h3>
                    <v-row style="margin:0 -5px">
                        <v-col cols="12" sm="3" md="2" v-for="(image,i) in images" :key="i" style="padding:5px;">
                             <div class="item-image">
                                     <v-img width="100%" height="150px" :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                                </div>
                        </v-col>
                    </v-row>
                </section>
                <section style="margin-top:25px;">
                    <h3>Danh sách phòng</h3>
                    <v-row style="margin:0 -5px">
                        <v-col cols="12" sm="4" md="3" v-for="(room,i) in rooms" :key="i" style="padding:5px;">
                            <v-img :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM" height="180px"></v-img>
                            <p style="margin-top:15px;margin-bottom:0"><strong>Tên Phòng: </strong> {{room.NAME_ROOM_BAR_KARAOKE}}</p>
                            <p><strong>Giá: </strong>{{room.RENT_COST}},000 <small>vnd</small> </p>
                            <p><strong>Sức chứa: </strong> <={{room.CAPACITY}}</p>
                        </v-col>
                    </v-row>
                </section>
            </v-col>
            <v-col cols="12" sm="5" md="4"></v-col>
            
        </v-row>
    </v-container>
    <v-overlay :value="$store.state.loading" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
</div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
    },
    data()
    {
        return {
            karaoke: {},
            rooms: [],
            images: []
        }
    },
    methods:{
        async ApiDetailKaraoke()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.safeurl).then((response) => {
                this.karaoke = response.data
                this.ApiMedia(response.data.UUID_BAR_KARAOKE)
                this.ApiGetRoom(response.data.UUID_BAR_KARAOKE)
            })
            this.$store.state.loading = false
        },
        ApiGetRoom(UUID)
        {
            this.$http.get(this.$store.state.API_URL + "room?UUID_BAR_KARAOKE="+ UUID).then((response) => {
                this.rooms = response.data
            })
        },
        ApiMedia(UUID)
        {
            this.$http.get(this.$store.state.API_URL + 'image/'+UUID+'?type=UUID_BAR_KARAOKE').then((response) => {
                this.images = response.data
            })
        }
    },
    created()
    {
       this.ApiDetailKaraoke()
    }
}
</script>

<style scoped>
.item-image {width: 100%;height: 150px;cursor: pointer;}
.list-link {padding-left: 0 !important;}
.name-karaoke {font-size: 22px;font-weight: bold;margin-bottom: 15px;}
p {margin-bottom: 0}
</style>