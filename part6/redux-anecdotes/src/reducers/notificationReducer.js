export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type: "SET_NOTIFICATION",
            notification: notification
        })
        setTimeout(() => {
            dispatch({
                type: "CLEAR"
            })
        }, timeout*1000)
    }
}
export const clearNotification = () => {
    return {
        type: "CLEAR"
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification
        case "CLEAR":
            return null
        default:
            return state
    }
}

export default reducer