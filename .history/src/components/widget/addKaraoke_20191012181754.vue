<template>
 <v-dialog v-model="dialog" persistent scrollable hide-overlay :no-click-animation="true" >
      <v-card class="widget-add-karaoke">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        
      </v-card>
</v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: ["dialog"],
    
}
</script>

<style scoped>
.widget {width: 350px;top: 0;right: 0;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>