import Vue from 'vue'
import Vuex from 'vuex'
import ModuleManagerKaraoke from './modules/managerKaraoke'
Vue.use(Vuex)
const state = {
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000',
    loading: false
}

export default new Vuex.Store({
    state,
    modules : {
        ModuleManagerKaraoke
    }
})