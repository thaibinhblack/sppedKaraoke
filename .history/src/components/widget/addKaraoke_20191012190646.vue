<template>
 <v-dialog v-model="dialog" persistent max-width="350px" hide-overlay class="widget">
      <v-card class="widget-add-karaoke">
        <v-card-title>
          
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
.widget {width: 350px;top: 0;right: 0;z-index: 999;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>