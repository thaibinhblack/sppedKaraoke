<template>
   <v-row>
        <v-col cols="12" sm="4"  class="custom">
            <v-list-item>
                <v-list-item-title>
                   {{group.NAME_GROUP_FUNCTION}}
                </v-list-item-title>
            </v-list-item>
        </v-col>
        <v-col cols="12" sm="2" class="custom">
            <v-checkbox></v-checkbox>
        </v-col>
        <v-col cols="12" sm="2"  class="custom">
            <v-checkbox></v-checkbox>
        </v-col>
        <v-col cols="12" sm="2"  class="custom">
            <v-checkbox></v-checkbox>
        </v-col>
        <v-col cols="12" sm="2" class="custom">
            <v-checkbox></v-checkbox>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["group"]
}
</script>

<style scoped>
.custom {padding: 0;text-align: center}
</style>