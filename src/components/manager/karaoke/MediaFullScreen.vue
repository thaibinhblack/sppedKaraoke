<template>
 <v-dialog v-model="dialog" scrollable fullscreen hide-overlay transition="dialog-bottom-transition" style="z-index:999">
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text>Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text v-if="images.length > 0">
           <hooper group="group1" style="height:375px" >
                <slide class="item-slider" v-for="(image,index) in images" :key="index" :index="index" >
                  <div class="icon-delete icon-action">
                      <v-button @click="delete_image(image.UUID_IMAGE)"><v-icon >mdi-delete</v-icon> </v-button>
                  </div>
                  <div class="icon-upload icon-action">
                    <v-icon >mdi-upload</v-icon>
                    <input class="upload-banner" type="file" ref="slider" @change="rednerSlider(index)">
                  </div>
                    <v-img height="375px" :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                </slide>
            </hooper>

            <hooper group="group1" :itemsToShow="4" :centerMode="true">
                <slide v-for="(image,index) in images" :key="index" style="padding:10px;">
                    <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                    
                </slide>
            </hooper>
        </v-card-text>
      </v-card>
</v-dialog>

</template>

<script>
import { Hooper, Slide } from 'hooper';
export default {
    components: {
        Hooper, Slide
    },
    props: ["dialog", "images"],
    data()
    {
      return {
        slider: 0
      }
    },
    methods: {
      rednerSlider(index)
      {
          var reader  = new FileReader()
          const file = this.$refs.slider
          // this.karaoke.BANNER_BAR_KARAOKE = file
          console.log(index,file)
          // this.images[index].URL_IMAGE  = URL.createObjectURL(file)
      },
      delete_image(id)
      {
        this.axios.post(this.$store.state.API_URL + 'image/delete?UUID_IMAGE='+id).then((response) => {

        })
      }
    }
}
</script>
<style scoped>
.item-slider {position: relative;}
.header-media {background: #eeeeee;}
.icon-delete {right: 0;top: 0; color: #fff;}
.icon-action {position: absolute;z-index: 999;padding: 7px;background: #ffffffb8;cursor: pointer;opacity: 0;}
.icon-action:hover i{color: #f65e39;}
.icon-upload {top: 50%;left: 50%;transform: translate(-50%,-50%)}
.icon-action>i {font-size: 25px;}
.item-slider:hover .icon-action {opacity: 1;}
</style>