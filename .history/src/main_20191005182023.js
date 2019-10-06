import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSession from 'vue-session'
import VueApexCharts from 'vue-apexcharts'
import store from './store'
Vue.component('apexcharts', VueApexCharts)
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vueperslides/dist/vueperslides.css'

Vue.use(VueAxios,axios)
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
