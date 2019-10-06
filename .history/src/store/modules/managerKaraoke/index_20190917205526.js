const state = {
    BarKaraoke: {},
    user: '123'
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