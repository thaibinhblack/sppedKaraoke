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
                    <li><router-link :to="'/karaoke?ID_DISTRICT='+karaoke.ID_DISTRICT">{{karaoke.NAME_DISTRICT}}</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{karaoke.ADDRESS_BAR_KARAOKE}}</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="8" md="9">
                <h2 class="name-karaoke">{{karaoke.NAME_BAR_KARAOKE}}
                    <!-- <button class="btn btn-add" @click="chatNow()">Chat ngay</button> -->
                    <v-icon class="star-rating" v-for="(star,i) in stars" :key="i" :class="star.class" @click="rating(star.value)">mdi-star</v-icon>
                    
                </h2>
                <P>
                    <v-icon color="yellow" size="22px" v-for="(star,i) in Math.floor(karaoke.STAR_RATING)" :key="i">mdi-star</v-icon>
                    <span style="margin-left: 15px">({{karaoke.NUMBER_REATED}} đánh giá)</span>
                    <span> , {{karaoke.VIEW}} lượt xem</span>
                    <small style="margin-left: 15px;">{{karaoke.CREATED_AT}}</small>
                </P>
                <p><v-icon>mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}} <a v-if="karaoke.OBJECTID != null" :href="'/map?UUID_BAR_KARAOKE='+karaoke.UUID_BAR_KARAOKE" target="_blank">  Xem bản đồ </a> </p>
                <p class="content" v-html="karaoke.CONTENT_BAR_KARAOKE"></p>
                 <fb-comment data-width="100%" width="100%" :url="$store.state.DOMAIN + karaoke.URL_SAFE" />
                <section v-if="images.length > 0">
                    <h3>Hình ảnh về chi nhánh</h3>
                    <v-row style="margin:0 -5px">
                        <v-col cols="12" sm="3" md="2" v-for="(image,i) in images" :key="i" style="padding:5px;">
                             <div class="item-image">
                                     <v-img width="100%" height="150px" :src="image.url" @click="imageView(i)"></v-img>
                                </div>
                        </v-col>
                    </v-row>
                </section>
                <list-room :karaoke="karaoke" :rooms="rooms" />
            </v-col>
            <v-col cols="12" sm="4" md="3" v-if="karaoke_star.length > 0">
                <div class="item-karaoke" v-for="(karaoke,index) in karaoke_star" :key="index">
                    <div class="image-karaoke">
                        <v-img height="180px" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE"></v-img>
                    </div>
                     <div class="content-karaoke">
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <v-avatar
                                    size="50px"
                                    color="#e2e2e2"
                                >
                                    <img v-if="karaoke.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" alt="">
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-title>
                                
                                <p> 
                                    <strong class="title"><router-link :to="'/karaoke/'+karaoke.URL_SAFE">{{karaoke.NAME_BAR_KARAOKE}}</router-link> </strong> <br/>
                                    <v-icon v-for="(star,i) in Math.floor(karaoke.STAR_RATING)"  :key="i" color="yellow" size="13px">mdi-star</v-icon>
                                    <small> ({{karaoke.NUMBER_REATED}}), {{karaoke.VIEW}} lượt xem</small>
                                </p>
                                    
                            </v-list-item-title>
                        
                        </v-list-item>
                        <div class="group-address">                        
                            <small><span><v-icon size="13px" color="#f65e39">mdi-map-marker</v-icon> {{karaoke.NAME_PROVINCE}} > {{karaoke.NAME_DISTRICT}}</span></small>
                            <p><small class="address"><v-icon size="13px" color="#f65e39">mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</small></p>
                        </div>
                    </div>
                </div>
            </v-col>
            
        </v-row>
    </v-container>
</div>
</template>

<script>
import stream from 'getstream'
export default {
    sockets: {
        connect: function () {
            console.log('socket connected')
        }
    },
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'media-karaoke': () => import('@/components/karaoke/KaraokeMedia.vue'),
        'list-room': () => import ('@/components/contents/room/listRoom.vue') 
    },
    data()
    {
        return {
            karaoke: {},
            rooms: [],
            images: [],
            dialog: false,
            imageSelected: null,
            stars: [
                {class: '',  value: 1},
                {class: '',  value: 2},
                {class: '',  value: 3},
                {class: '',  value: 4},
                {class: '',  value: 5}
            ],
            karaoke_star: [],
            safe_url: this.$route.params.safeurl
        }
    },
    watch:
    {
       '$route': {
            handler: 'ApiDetailKaraoke',
            immediate: true
        }
    },
    methods:{
        ApiDetailKaraoke()
        {
           
            const app = this;
             this.$http.get(this.$store.state.API_URL + 'karaoke?safe_url='+this.$route.params.safeurl).then((response) => {
                this.karaoke = response.data
                this.$http.get(this.$store.state.API_URL +'karaoke/'+'response.data.UUID_BAR_KARAOKE+'/view').then(() => {
                    this.karaoke.VIEW = this.karaoke.VIEW + 1
                })
                this.$nextTick(() => {
                     this.ApiGetRoom(response.data.UUID_BAR_KARAOKE)
                     this.$nextTick(() => {
                         this.ApiMedia(response.data.UUID_BAR_KARAOKE)
                     })
                     
                     this.ApiGetKaraokeStar(response.data.ID_PROVINCE,response.data.UUID_BAR_KARAOKE)
                })
               
            })
          
        },
        ApiGetRoom(UUID)
        {
            this.$http.get(this.$store.state.API_URL + "room?UUID_BAR_KARAOKE="+ UUID).then((response) => {
                this.rooms = response.data
                console.log('rooms',response.data)
            })
        },
        ApiGetKaraokeStar(UUID,UUID_BAR_KARAOKE)
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?ID_PROVINCE='+UUID+'&UUID_BAR_KARAOKE='+UUID_BAR_KARAOKE).then((response) => {
                this.karaoke_star = response.data
            })
        },

        ApiMedia(UUID)
        {
            this.$http.get(this.$store.state.API_URL + 'image/'+UUID+'?type=UUID_BAR_KARAOKE').then((response) => {
                // this.images = response.data
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
                // console.log(this.images)
            })
        },
        imageView(index) {
            this.$imageViewer.index(index);
            this.$imageViewer.show();
        },
        rating(i)
        {
            console.log(i)
            if(this.$cookies.isKey('token'))
            {
                this.stars =  this.stars.filter((value,index,array) => {
                    if(i >= index)
                    {
                        array[index].class = 'active'
                    }
                    else
                    {
                        array[index].class = ''
                    }
                    return array[index]
                })
                this.ApiRating(i)
                
            }
            else
            {
                this.$router.push('/login')
            }
        },
        ApiRating(i)
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.karaoke.UUID_BAR_KARAOKE 
            + '/rating?api_token='+this.$cookies.get('token')+'&rating='+i).then((response) => {
                if(response.data.success  == true)
                {
                    this.ApiDetailKaraoke()
                }
                
            })
        }
    },
    // async mounted()
    // {
    //     this.$store.state.loading = true
    //     await this.ApiDetailKaraoke()
    //     this.$store.state.loading = false
    // },
    created()
    {
        
        this.ApiDetailKaraoke()
        
    }
}
</script>

<style scoped>
a {color: #333 !important;}
a:hover {color: #f65e39  !important}
.item-karaoke {margin-bottom: 10px;border:1px solid #e2e2e2;background: #fff;}
.item-image {width: 100%;height: 150px;cursor: pointer;}
.content-karaoke {padding: 10px;    }
.list-link {padding-left: 0 !important;}
.name-karaoke {font-size: 22px;font-weight: bold;margin-bottom: 15px;}
p {margin-bottom: 0;font-size: 13px;}
.star-rating  {
      font-size: 1.5em;
  margin: 4px;
  color: #ccc;
  cursor: pointer;
}
.star-rating:hover, .star-rating.active {color: yellow}
#detail-karaoke {background:#eee;}
.title {font-size: 18px !important;}
.item-room {background: #fff;}
.content-room {padding: 7px 7px 15px 7px;}
</style>