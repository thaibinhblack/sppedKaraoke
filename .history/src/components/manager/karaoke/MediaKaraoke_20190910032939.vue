<template>
    <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-label" style="font-size: 15px;">THƯ VIỆN ẢNH</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="3" md="2" v-for="(image,i) in images" :key="i">
                                <div class="item-image">
                                     <v-img width="100%" height="150px" :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                                </div>
                               
                            </v-col>
                            <v-col cols="12" sm="3" md="2">
                                <div class="add-media btn-add">
                                    <input class="input-media meida" type="file" ref="MyMedia" @change="uploadMedia()">

                                     <v-img class="media img-media" v-if="media != null" width="100%" height="150px" :src="media"></v-img>
                                    <v-icon>mdi-plus</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    data()
    {
        return {
             images: [],
             media: null
        }
    },
    methods: {
        ApiGetMedia()
        {
            this.$http.get(this.$store.state.API_URL +'image/'+this.$route.params.uuid+'?type=UUID_BAR_KARAOKE').then((response) => {
                this.images = response.data
            })
        },
        uploadMedia()
        {
             var reader  = new FileReader()
            const file = this.$refs.MyMedia.files[0]
            // this.karaoke.LOGO_BAR_KARAOKE = file
            this.media  = URL.createObjectURL(file)
            // console.log(this.karaoke.LOGO)
            const data = new FormData()
            data.append("UUID_BAR_KARAOKE",this.$route.params.uuid)
            data.append("URL_IMAGE",file)
            data.append("UUID_IMAGE",uuid.v4())
            this.$http.post(this.$store.state.API_URL + 'image',data).then(() => {
                this.media = null
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
.media {position: absolute;top: 0;left: 0;width: 100%}
.input-media {opacity: 0;z-index: 9999;}
.img-media {z-index: 2;}
</style>


