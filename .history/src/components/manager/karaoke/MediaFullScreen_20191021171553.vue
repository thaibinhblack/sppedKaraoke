<template>

<v-dialog
    v-model="dialog"
    persistent
    scrollable fullscreen 
    transition="dialog-transition"
>
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
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

<hooper group="group1" :itemsToShow="3" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
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
    props: ["dialog", "selected"]
}
</script>
<style scoped>
.header-media {background: #eeeeee;}
</style>