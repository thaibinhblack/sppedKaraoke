<template>
<v-card class="widget">
    <v-card-title primary-title>
        Thêm địa chỉ province
    </v-card-title>

    <v-card-text>
         <v-text-field
            name="ID_PROVINCE"
            label="ID"
        ></v-text-field>
        <v-text-field
            name="NAME_PROVINCE"
            label="Tỉnh / Thành Phố"
        ></v-text-field>
        <v-text-field
            name="LONG"
            label="Long"
        ></v-text-field>
        <v-text-field
            name="LAT"
            label="Lat"
        ></v-text-field>
    </v-card-text>
    <v-card-actions>
        <button>Thêm</button>
    </v-card-actions>
</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ["dialog"],
    computed: {
        ...mapGetters(["getView"])
    },
    watch: {
        dialog(newVal ){
            if(newVal == true)
            {
                this.getView.on("click", (event) => {
                    console.log(event)
                })
            }
        }
    }
}
</script>