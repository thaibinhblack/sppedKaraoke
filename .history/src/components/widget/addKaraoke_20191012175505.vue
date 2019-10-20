<template>
 <v-dialog v-model="dialog" persistent scrollable hide-overlay >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        
      </v-card>
</v-dialog>
</template>
<script>
export default {
    props: ["dialog"]
}
</script>

<style scoped>
.widget {width: 350px;top: 0;right: 0;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>