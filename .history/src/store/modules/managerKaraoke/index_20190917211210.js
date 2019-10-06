const state = {
    BarKaraoke: {},
    user: {}
}
const mutations = {
    updateBarKaraoke : (state,payload) => {
        state.BarKaraoke  = payload
    },
    updateUser: (state,payload) => {
        state.user = payload
    }
}

const actions = {
    commitBarKaraoke:({commit},payload) => {
        commit("updateBarKaraoke", payload)
    },
    commitUser: ({commit},payload) => {
        commit("updateUser",payload)
    }
}
export default {
    state,
    mutations,
    actions
}