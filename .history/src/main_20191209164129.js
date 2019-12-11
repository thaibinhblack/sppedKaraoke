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
import 'hooper/dist/hooper.css'
import 'vue2-timepicker/dist/VueTimepicker.css'

import VueGeolocation from 'vue-browser-geolocation';
import VueCookies from 'vue-cookies'
import imageViewer from "vue-image-viewer";
import StarRating from 'vue-star-rating'
import 'vue2-timepicker/dist/VueTimepicker.css'
Vue.component('star-rating', StarRating);
Vue.use(imageViewer);
Vue.use(VueCookies)
// set default config
VueCookies.config('7d')
// set global cookie
VueCookies.set('theme','default');
VueCookies.set('hover-time','1s');
VueCookies.config('30d')

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(VueGeolocation);
// const socket = io('http://127.0.0.1:3000');
Vue.use(Antd);
// Vue.use(VueSocketIOExt, socket);

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
