function githubReducer(state, action) {
    switch(action.type) {
        case 'get_users':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'set_loading':
            return {
                ...state, 
                loading: true
            }
        default:
            return state
    }
}

export default githubReducer