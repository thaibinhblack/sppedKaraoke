const state = {
   action: {
    view: '2.0',
    create: '2.0',
    edit: '2.0',
    delete: '2.0'
   }
}

const getters = {
    getAction:(state) =>
    {
        return state.action
    }
}