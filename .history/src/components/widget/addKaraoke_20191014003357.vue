<template>

<v-card class="widget-add-karaoke">
  <v-card-title>
      <span>Thêm địa chỉ chi nhánh lên bản đồ</span>
  </v-card-title>
  
</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: ["dialog"],
    
}
</script>

<style scoped>
span {font-size: 18px;}
.widget {width: 350px;top: 0;right: 0;z-index: 999;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>