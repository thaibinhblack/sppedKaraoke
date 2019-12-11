import Vue from 'vue'
import Vuex from 'vuex'
import ModuleManagerKaraoke from './modules/managerKaraoke'
import mapModule from './modules/map'
import karaokeModule from './modules/karaoke'
import ModuleFunctionBooking from './modules/functions/booking'
import ModuleManager from './modules/functions'
Vue.use(Vuex)
const state = {
            // API_URL: 'https://speedkaraoke.herokuapp.com/api/v1/',
            // PUBLIC_URL: 'https://speedkaraoke.herokuapp.com',
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000',
    DOMAIN: 'https://appkaraoke-595d7.firebaseapp.com/',
    loading: false,
    token: null,
    manager: false,
    UUID_RULE: ''
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
        mapModule,
        karaokeModule,
        ModuleFunctionBooking,
        ModuleManager
    }
})