<template>
<v-dialog
    v-model="dialog"
    persistent :overlay="false"
    max-width="600px"
    transition="dialog-transition"
>
    <v-card>
        <v-card-title primary-title>
            <span>Thư viện hình ảnh quán karaoke</span>
        </v-card-title>
        <v-card-text>
           <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ["dialog","image"]
}
</script>