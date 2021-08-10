export const setNotification = (text, timeout) => {
    return async (dispatch, getState) => {

        setTimeout(() => {
            dispatch({
                type: "CLEAR"
            })
        }, timeout*1000)
        dispatch({
            type: "SET_NOTIFICATION",
            notification: {text}
        })
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