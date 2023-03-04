export default function alertReducer(state, action) {
    switch(action.type) {
        case 'set_alert':
            return action.payload
            case 'remove_alert':
                return null
        default:
            return state
    }
}