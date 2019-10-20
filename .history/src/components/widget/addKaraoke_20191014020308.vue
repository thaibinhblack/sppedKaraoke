<template>

<v-card class="widget-add-karaoke" v-if="dialog == true">
  <v-card-title>
      <span>Thêm địa chỉ chi nhánh lên bản đồ</span>
  </v-card-title>
  <v-card-text>
    <v-text-field
      name="NAME_BAR_KARAOKE"
      label="Tên chi nhánh"
      v-model="karaoke.NAME_BAR_KARAOKE"
      prepend-icon="mdi-store"
      required
    ></v-text-field>
    <v-select
      :items="provinces"
      item-value="ID_PROVINCE"
      item-text="NAME_PROVINCE"
      v-model="karaoke.ID_PROVINCE"
      prepend-icon="mdi-map-marker"
      label="Tỉnh / Thành Phố"
    ></v-select>
    <v-select
      :items="districts"
      item-text="NAME_DISTRICT"
      item-value="ID_DISTRICT"
      v-model="karaoke.ID_DISTRICT"
      prepend-icon="mdi-map-marker"
      label="Quận / Huyện"
    ></v-select>
    <v-text-field
      name="ADDRESS"
      label="Địa chỉ"
      v-model="karaoke.ADDRESS"
      prepend-icon="mdi-map-marker"
    ></v-text-field>
    <v-text-field
      name="LONG"
      label="Long"
      v-model="karaoke.long"
      prepend-icon="mdi-map-marker"
      disabled
    ></v-text-field>
    <v-text-field
      name="LAT"
      label="Lat"
      v-model="karaoke.lat"
      prepend-icon="mdi-map-marker"
      disabled
    ></v-text-field>
  </v-card-text>
  <v-card-actions>
            <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
      <v-btn color="blue darken-1" text @click="addFeature()">Save</v-btn>
  </v-card-actions>
</v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ["dialog"],
    data()
    {
      return {
        karaoke: {},
        provinces: [],
        districts: [],
        long: null,
        lat: null,
        mapPoint: null
      }
    },
    computed:{
      ...mapGetters(["getView"])
    },
    watch:{
      getView(newVal)
      {
        console.log(newVal)
        if(newVal != null)
        {

          this.getView.on("click", (event) => {
              this.karaoke.long = event.mapPoint.longitude
              this.karaoke.lat = event.mapPoint.latitude
              this.mapPoint = event.mapPoint
              this.commitdrawPoint(event.mapPoint)
            })
          }
  
      }
    },
    methods: {
      ...mapActions(["commitdrawPoint","commitaddFeature"]),
      ApiProvince()
      {
        this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
          this.provinces = response.data
        })
      },
      ApiDistrict(ID)
      {
        this.$http.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+ID).then((response) => {
          this.districts = response.data
        })
      },
      async ApiGetKaraoke()
      {
        this.$store.state.loading = true
        await this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.query.karaoke+'?api_token='+this.$session.get('token'))
        .then((response) => {
          this.karaoke = response.data
          this.ApiDistrict(response.data.ID_PROVINCE)
        })
        this.$store.state.loading = false
      },
      addFeature()
      {
        this.commitaddFeature({
          geometry: this.mapPoint,
          attributes: this.karaoke
        })
      }
    },
    created()
    {
      this.ApiProvince()
      this.ApiGetKaraoke()
      
    }
}
</script>

<style scoped>
span {font-size: 18px;}
.widget {width: 350px;top: 0;right: 0;z-index: 999;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>