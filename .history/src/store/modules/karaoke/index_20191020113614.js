const state = {
    karaokes : [],
    karaokes_tmp: []
}

const getters = {
    getkaraokes: (state) => {
        return state.karaokes
    }
}

const mutations = {
    searchKaraoke: (state,payload) => {
        if(payload.SEARCH == 'ID_PROVINCE')
        {
            state.karaokes = state.karaokes_tmp.filter((value,index,array) => {
                return array[index].ID_PROVINCE == payload.VALUE
            })
        }
    }
}

const actions = {
    commitsearchKaraoke: ({commit},payload) => {
        commit("searchKaraoke",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}