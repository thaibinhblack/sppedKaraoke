const state = {
    store: {
        view: '1.0',
        create: '1.0',
        edit: '1.0',
        delete: '1.0'
    },
    booking: {
        view: '2.0',
        create: '2.0',
        edit: '2.0',
        delete: '2.0'
    },
    promotion: {
        view: '4.0',
        create: '4.0',
        edit: '4.0',
        delete: '4.0'
    }
}

const getters = {
    get_store: (state) => {
        return state.store
    },
    get_booking: (state) => {
        return state.booking
    },
    get_promotion: (state) => {
        return state.promotion
    }
}

const mutations = {
    update_store: (state,payload) => {
        state.store = payload
    },
    update_booking: (state,payload) => {
        state.booking = payload
    },
    update_promotion: (state,payload) => {
        state.promotion = payload
    }
}


const actions = {
    commit_store: ({commit},payload) => {
        commit("update_store",payload)
    },
    commit_booking: ({commit},payload) => {
        commit("update_booking",payload)
    },
    commit_promotion: ({commit},payload) => {
        commit("update_promotion",payload)
    }
}