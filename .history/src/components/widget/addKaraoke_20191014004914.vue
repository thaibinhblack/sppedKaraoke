<template>

<v-card class="widget-add-karaoke">
  <v-card-title>
      <span>Thêm địa chỉ chi nhánh lên bản đồ</span>
  </v-card-title>
  <v-card-text>
    <v-text-field
      name="NAME_BAR_KARAOKE"
      label="Tên chi nhánh"
      v-model="karaoke.NAME_BAR_KARAOKE"
      required
    ></v-text-field>
    <v-select
      :items="provinces"
      item-value="ID_PROVINCE"
      item-text="NAME_PROVINCE"
      v-model="karaoke.ID_PROVINCE"
      label="Tỉnh / Thành Phố"
    ></v-select>
    <v-select
      :items="districts"
      item-text="NAME_DISTRICT"
      item-value="ID_DISTRICT"
      v-model="karaoke.ID_DISTRICT"
      label="Quận / Huyện"
    ></v-select>
  </v-card-text>
</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: ["dialog"],
    data()
    {
      return {
        karaoke: {},
        provinces: [],
        districts: []
      }
    },
    methods: {
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