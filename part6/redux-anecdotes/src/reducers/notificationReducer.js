export const setNotification = (notification) => {
    return {
        type: "SET_NOTIFICATION",
        notification: notification
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