<template>
<v-dialog
    v-model="dialog"
    persistent
    hide-overlay
    transition="dialog-transition"
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