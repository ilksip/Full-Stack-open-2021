export const setNotification = (text, timeout, prevId) => {
    return async (dispatch, getState) => {
        if (prevId) {
            console.log(prevId)
            console.log("here")
            clearTimeout(prevId)
        }
        const timeoutId = setTimeout(() => {
            dispatch({
                type: "CLEAR"
            })
        }, timeout*1000)
        dispatch({
            type: "SET_NOTIFICATION",
            notification: {text, timeoutId}
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