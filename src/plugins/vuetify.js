import Vue from 'vue';
import Vuetify, {
  VCard,
  VRating,
  VToolbar,
  VContainer,
  VRow,
  VCol,
  VFlex,
  VDivider,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: {
    VCard,
    VRating,
    VToolbar,
    VContainer,
    VRow,
    VCol,
    VFlex,
    VDivider,
  },
  directives: {
    Ripple,
  },
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
