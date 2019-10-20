<template>
<v-dialog
    v-model="dialog"
    persistent
    class="widget"
    >
    <v-card class="widget-add-karaoke">
        <v-card-title primary-title>
            Thêm địa chỉ trên bản đồ
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