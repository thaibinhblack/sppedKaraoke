import Vue from 'vue'
import Vuex from 'vuex'
import ModuleManagerKaraoke from './modules/managerKaraoke'
import mapModule from './modules/map'
Vue.use(Vuex)
const state = {
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000',
    DOMAIN: 'https://appkaraoke-595d7.firebaseapp.com/',
    loading: false,
    token: null,
    manager: false
}
const getters = {
    getToken: (state) => {
        return state.token
    },
    getManager: (state) => {
        return state.manager
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