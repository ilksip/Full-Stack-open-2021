

export const set_notification = (message) => {
    return async dispatch => {
        dispatch({
            type: "SET_NOTIFICATION",
            notification: message
        })
        setTimeout(() => {
            dispatch({
                type: "CLEAR"
            })
        }, 5000)
    }
}

export const clear_notification = () => {
    return {
        type: "CLEAR"
    }
}


const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case "SET_NOTIFICATION":
        return action.notification
    case "CLEAR":
        return null
    default:
        return state
    }
}

export default notificationReducer