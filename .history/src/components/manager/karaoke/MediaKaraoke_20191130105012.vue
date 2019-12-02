<template>
    <v-col cols="12" sm="12" >
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-label" style="font-size: 15px;">THƯ VIỆN ẢNH</span>
                    </v-card-title>
                    <v-card-text>
                        <!-- <v-row v-if="room == true">
                            <v-col cols="12" sm="3" md="2" style="position:relative">
                                <p>Ảnh đại diện phòng</p>
                                 <v-img v-if="BANNER != null" width="100%" :src="BANNER" ref="imageRoom" height="150px" style="background:#e2e2e2;"></v-img>
                                <v-img v-else-if="IMAGE_ROOM != null" width="100%" ref="imageRoom" height="150px" :src="$store.state.PUBLIC_URL + IMAGE_ROOM"></v-img>
                            
                              
                                <v-icon class="icon-upload">mdi-upload</v-icon>
                                <input type="file" ref="imageRoom" class="input-media media" @change="uploadImageRoom()">
                            </v-col>
                        </v-row> -->
                        <v-row >
                            <v-col  cols="12" sm="3" md="2" v-for="(image,i) in images" :key="i">
                                <div class="item-image" @click="selected = i">
                                     <v-img width="100%" height="150px" :src="image.TYPE == 'firebase' ? image.URL_IMAGE : $store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                                </div>
                               
                            </v-col>
                            <v-col cols="12" sm="3" md="2">
                                <div class="add-media btn-add">
                                    <input class="input-media media" type="file" ref="MyMedia" @change="uploadMedia()">

                                     <v-img class="media img-media" v-if="media != null" width="100%" height="150px" :src="media"></v-img>
                                    <v-icon>mdi-plus</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <media-full :dialog="dialog" :images="images" :selected="selected"/>
            </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    components: {
        'media-full': () => import('./MediaFullScreen.vue')
    },
    props: ["room", "IMAGE_ROOM"],
    data()
    {
        return {
             images: [],
             media: null,
             dialog: false,
             selected: null,
             BANNER: null
        }
    },
    watch: {
        selected(newVal)
        {
            if(newVal != null)
            {
                this.dialog = true
                const tmp = null
                tmp = this.images[0] 
                this.images[0] = this.images[newVal]
                this.images[newVal] = tmp
            }
            else
            {
                this.dialog = false
            }
        }
    },
    methods: {
        async ApiGetMedia()
        {
            this.$store.state.loading = true
            if(this.room !=  true)
            {
                await this.$http.get(this.$store.state.API_URL +'image/'+this.$route.params.uuid+'?type=UUID_BAR_KARAOKE').then((response) => {
                    this.images = response.data
                })
            }
            else
            {
                await this.$http.get(this.$store.state.API_URL +'image/'+this.$route.params.uuid_room+'?type=UUID_ROOM_BAR_KARAOKE').then((response) => {
                    this.images = response.data
                })
            }
            this.$store.state.loading = false
        },
        uploadMedia()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyMedia.files[0]
            // this.karaoke.LOGO_BAR_KARAOKE = file
            this.media  = URL.createObjectURL(file)
            // console.log(this.karaoke.LOGO)
            const data = new FormData()
            if(this.room != true)
            {   
                data.append("UUID_BAR_KARAOKE",this.$route.params.uuid)
            }
            else
            {
                data.append("UUID_ROOM_BAR_KARAOKE",this.$route.params.uuid_room)
            }
            
            data.append("URL_IMAGE",file)
            data.append("UUID_IMAGE",uuid.v4())
            this.$http.post(this.$store.state.API_URL + 'image',data).then(() => {
                this.media = null
                this.ApiGetMedia()
            })
        },
        uploadImageRoom()
        {
            var reader  = new FileReader()
            const file = this.$refs.imageRoom.files[0]
            const data = new FormData()
            data.append("IMAGE_ROOM",file)
            this.BANNER  = URL.createObjectURL(file)
            this.axios.post(this.$store.state.API_URL + 'room/'+this.$route.params.uuid_room+'?api_token='+this.$session.get('token'),data)
            .then((response) => {

            })
        }
    },
    created()
    {
         this.ApiGetMedia()
    }
}
</script>

<style scoped>
.item-image {width: 100%;height: 150px;;}
.add-media {position: relative; height: 150px;}
.add-media i {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)}
.media {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.input-media {opacity: 0;z-index: 99999;cursor: pointer;}
.img-media {z-index: 2;}
.icon-upload {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);cursor: pointer;}
</style>


