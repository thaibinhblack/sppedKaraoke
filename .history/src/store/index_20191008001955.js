import Vue from 'vue'
import Vuex from 'vuex'
import ModuleManagerKaraoke from './modules/managerKaraoke'
import mapModule from './modules/map'
Vue.use(Vuex)
const state = {
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000',
    DOMAIN: 'http://127.0.0.1:8080/',
    loading: false,
    token: null
}
const getters = {
    getToken: (state) => {
        return state.token
    }
}

export default new Vuex.Store({
    state,
    getters,
    modules : {
        ModuleManagerKaraoke,
        mapModule
    }
})