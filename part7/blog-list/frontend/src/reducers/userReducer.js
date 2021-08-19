import loginService from "../services/login"
import blogService from "../services/blogs"
import { set_notification } from "./notificationReducer"
export const login = (username, password) => {
    return async dispatch => {
        console.log("trying to log in", username, password)
        try {
            const user = await loginService.login({ username, password })
            console.log(user)
            window.localStorage.setItem("loggeduser", JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: "LOGIN",
                user: user
            })
        } catch (error) {
            console.log(error)
            dispatch(set_notification("Wrong credentials"))
        }
    }
}
export const checkLogin = () => {
    return async dispatch => {
        const user = window.localStorage.getItem("loggeduser")
        if (user) {
            const parsedUser = JSON.parse(user)
            blogService.setToken(parsedUser.token)
            dispatch({
                type: "LOGIN",
                user: parsedUser
            })
        }
    }
}
export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggeduser")
        dispatch({
            type: "LOGOUT"
        })
    }
}
const reducer = (state = null, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.user
    case "LOGOUT":
        return null
    default: return state
    }
}
export default reducer