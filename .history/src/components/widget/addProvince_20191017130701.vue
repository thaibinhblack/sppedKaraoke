<template>
<v-card class="widget" v-if="dialog == true">
    <v-card-title primary-title>
        Thêm địa chỉ province
    </v-card-title>

    <v-card-text>
         <v-text-field
            name="ID_PROVINCE"
            label="ID"
            v-model="province.ID_PROVINCE"
        ></v-text-field>
        <v-text-field
            name="NAME_PROVINCE"
            label="Tỉnh / Thành Phố"
            v-model="province.NAME_PROVINCE"
        ></v-text-field>
        <v-text-field
            name="LONG"
            label="Long"
            v-model="provice.LONG_PROVINCE"
        ></v-text-field>
        <v-text-field
            name="LAT"
            label="Lat"
            v-model="province.LAT_PROVINCE"
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
    data()
    {
        return {
            province: {
                LONG_PROVINCE: 0,
                LAT_PROVINCE: 0
            }
        }
    },
    watch: {
        dialog(newVal){
            if(newVal == true)
            {
                this.getView.on("click", (event) => {
                    console.log(event)
                    this.province.LONG_PROVINCE = event.mapPoint.longitude
                    this.province.LAT_PROVINCE = event.mapPoint.latitude
                })
            }
        }
    }
}
</script>