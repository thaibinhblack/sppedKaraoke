const state = {
    BarKaraoke: {},
    user: {}
}
const mutations = {
    updateBarKaraoke : (state,payload) => {
        state.BarKaraoke  = payload
    }
}

const actions = {
    commitBarKaraoke:({commit},payload) => {
        commit("updateBarKaraoke", payload)
    }
}
export default {
    state,
    mutations,
    actions
}