<template>
 <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="z-index:999">
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text>Save {{slider}}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
           <hooper group="group1" style="height:375px" v-model="slider" >
                <slide class="item-slider" v-for="(image,index) in images" :key="index" :index="index" >
                  <div class="icon-delete icon-action">
                    <v-icon >mdi-delete</v-icon>
                  </div>
                  <div class="icon-upload icon-action">
                    <v-icon >mdi-upload</v-icon>
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
    props: ["dialog", "selected", "images"],
    data()
    {
      return {
        slider: 0
      }
    }
}
</script>
<style scoped>
.item-slider {position: relative;}
.header-media {background: #eeeeee;}
.icon-delete {right: 0;top: 0; color: #fff;}
.icon-action {position: absolute;z-index: 999;padding: 7px;background: #fff;cursor: pointer;}
.icon-action>i {font-size: 25px;}
</style>