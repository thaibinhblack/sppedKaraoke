import Vue from 'vue';
import Vuetify, {
  VCard,
  VRating,
  VToolbar,
  VContainer,
  VRow,
  VFlex,
  VDivider,
  VList,
  VListGroup,
  VListItem,
  VListItemContent,
  VListItemIcon,
  VListItemTitle,
  VItemGroup,
  VImg,
  VIcon,
  VAvatar,
  VBtn,
  VListItemAvatar,
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
    VFlex,
    VDivider,
    VList,
    VListGroup,
    VListItem,
    VListItemContent,
    VListItemIcon,
    VListItemTitle,
    VItemGroup,
    VImg,
    VIcon,
    VAvatar,
    VBtn,
    VListItemAvatar
  },
  theme:{
    primary: '#ea4335'
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
