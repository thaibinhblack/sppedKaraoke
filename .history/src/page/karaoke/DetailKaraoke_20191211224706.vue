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
                <section class="comment">
                    <h3>Bình luận về chi nhánh</h3>
                    <a-comment v-for="(comment,index) in comments" :key="index">
                        <a slot="author">{{comment.DISPLAY_NAME}}</a>
                        <a-avatar
                        :src="$store.state.PUBLIC_URL + comment.AVATAR"
                        :alt="comment.DISPLAY_NAME"
                        slot="avatar"
                        />
                        <p slot="content">
                        {{comment.CONTENT_COMMENT}}
                        </p>
                        
                        
                    </a-comment>
                    <form @submit.prevent="api_comment_karaoke()">
                            <v-text-field
                                name="comment"
                                label="Bình luận về chi nhánh"
                                id="id"
                                placeholder="Nhập bình luận về chi nhánh"
                                v-model="comment_karaoke"
                            ></v-text-field>
                            <v-btn type="submit" outline color="primary" >Bình luận</v-btn>
                        </form>
                    
                </section>
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
    <footer-speedkaraoke />
</div>
</template>

<script>
import moment from 'moment';
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'media-karaoke': () => import('@/components/karaoke/KaraokeMedia.vue'),
        'list-room': () => import ('@/components/contents/room/listRoom.vue'),
        'footer-speedkaraoke': () => import ('@/components/footer/index.vue'),
        moment
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
            safe_url: this.$route.params.safeurl,
            likes: 0,
            dislikes: 0,
            action: null,
            moment,
            comments: [],
            content_comment: "",
            submitting: false,
            comment_karaoke: ""
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
                if(response.data.UUID_BAR_KARAOKE)
                {
                    this.karaoke = response.data
                    this.$http.get(this.$store.state.API_URL +'karaoke/'+response.data.UUID_BAR_KARAOKE+'/view').then(() => {
                        this.karaoke.VIEW = this.karaoke.VIEW + 1
                    })
                    this.$nextTick(() => {
                        this.api_get_comments(response.data.UUID_BAR_KARAOKE)
                        this.ApiGetRoom(response.data.UUID_BAR_KARAOKE)
                        this.$nextTick(() => {
                            this.ApiMedia(response.data.UUID_BAR_KARAOKE)
                        })
                        
                        this.ApiGetKaraokeStar(response.data.ID_PROVINCE,response.data.UUID_BAR_KARAOKE)
                    })
                }
                else
                {
                    this.$router.push('/')
                }
               
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
        },
        api_get_comments(UUID)
        {
            this.axios.get(this.$store.state.API_URL + 'comment/'+UUID).then((response) => {
                this.comments = response.data
            })
        },
        api_comment_karaoke()
        {
            if(!this.$cookies.isKey('token'))
            {
                this.$router.push('/login')
            }
            else
            {
                const form_comment = new FormData()
                form_comment.append("UUID_BAR_KARAOKE",this.karaoke.UUID_BAR_KARAOKE)
                form_comment.append("CONTENT_COMMENT",this.comment_karaoke)
                this.axios.post(this.$store.state.API_URL + 'comment?api_token='+this.$cookies.get('token'),form_comment).then(() => {
                    this.api_get_comments(this.karaoke.UUID_BAR_KARAOKE)
                })
            }
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

<style>
a {color: #333 !important;}
a:hover {color: #f65e39  !important}
.item-karaoke {margin-bottom: 10px;border:1px solid #e2e2e2;background: #fff;}
.item-image {width: 100%;height: 150px;cursor: pointer;}
.content-karaoke {padding: 10px;    }
.content-room>p {font-size: 13px !important;}
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
.item-room {background: #fff;border: 1px solid #e2e2e2;border-radius: 5px;box-shadow: 1px 0px 3px 3px #e2e2e2e2;}
.content-room {padding: 7px 7px 15px 7px;}
section.comment {background: #fff;padding: 10px;border: 1px solid #e2e2e2;border-radius: 5px;max-height: 500px;overflow: scroll}
 section.comment::-webkit-scrollbar {
  width: 5px;
}

/* Track */
section.comment::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
section.comment::-webkit-scrollbar-thumb {
  background: #f65e39;
}

/* Handle on hover */
section.comment::-webkit-scrollbar-thumb:hover {
  background: #f65e39;
}
</style>