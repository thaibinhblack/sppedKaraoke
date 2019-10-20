<template>

<v-card class="widget-add-karaoke">
  <v-card-title>
      <span>Thêm địa chỉ chi nhánh lên bản đồ</span>
  </v-card-title>
  <v-card-text>
    <v-text-field
      name="NAME_BAR_KARAOKE"
      label="Tên chi nhánh"
      required
    ></v-text-field>
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
        karaoke: {}
      }
    },
    methods: {
      async ApiGetKaraoke()
      {
        this.$store.state.loading = true
        await this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.query.karaoke+'?api_token='+this.$session.get('token'))
        .then((response) => {
          this.karaoke = response.data
        })
        this.$store.state.loading = false
      }
    },
    created()
    {
      this.ApiGetKaraoke()
    }
}
</script>

<style scoped>
span {font-size: 18px;}
.widget {width: 350px;top: 0;right: 0;z-index: 999;}
.widget-add-karaoke{width: 350px;top: 0;right: 0;height: 100%;position: absolute;}
</style>