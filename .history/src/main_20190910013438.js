import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as firebase from 'firebase'
import VueSession from 'vue-session'
import VueApexCharts from 'vue-apexcharts'
import store from './store'
Vue.component('apexcharts', VueApexCharts)
import axios from 'axios'
import VueAxios from 'vue-axios'
import Editor from 'vue-editor-js'
 
Vue.use(Editor)
Vue.use(VueAxios,axios)
Vue.use(VueSession)

var firebaseConfig = {
  apiKey: "AIzaSyApI3IYFCloE4ZCB-ZOiPR8DV7y3Hvqgi4",
  authDomain: "appkaraoke-595d7.firebaseapp.com",
  databaseURL: "https://appkaraoke-595d7.firebaseio.com",
  projectId: "appkaraoke-595d7",
  storageBucket: "",
  messagingSenderId: "178224064982",
  appId: "1:178224064982:web:beb3fb9ddbfb5854"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
