<template>
<v-row justify="center">
 <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="z-index:999">
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
        <v-card-text>
           <hooper group="group1">
                <slide v-for="(image,index) in images" :key="index" style="height:250px">
                    <v-img height="250px" :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                </slide>
            </hooper>

            <hooper group="group1" :itemsToShow="4" :centerMode="true">
                <slide v-for="(image,index) in images" :key="index">
                    <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                </slide>
            </hooper>
        </v-card-text>
      </v-card>
</v-dialog>
</v-row>
</template>

<script>
import { Hooper, Slide } from 'hooper';
export default {
    components: {
        Hooper, Slide
    },
    props: ["dialog", "selected", "images"]
}
</script>
<style scoped>
.header-media {background: #eeeeee;}
</style>