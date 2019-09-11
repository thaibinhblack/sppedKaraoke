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
                                    <input class="input-media" type="file" ref="MyMedia" @change="uploadMedia()">

                                     <v-img v-if="media != null" width="100%" height="150px" :src="media"></v-img>
                                    <v-icon>mdi-plus</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
</template>

<script>
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
        }
    },
    created()
    {
         this.ApiGetMedia()
    }
}
</script>


<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 0;z-index: 999;width: 100%;height: 100%;}
</style>