<template>
<v-dialog
    v-model="dialog"
    scrollable fullscreen 
    transition="dialog-transition"
>
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-img :src="$store.state.PUBLIC_URL + selected"></v-img>
        </v-card-text>
      </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ["dialog", "selected"]
}
</script>
<style scoped>
.header-media {background: #eeeeee;}
</style>