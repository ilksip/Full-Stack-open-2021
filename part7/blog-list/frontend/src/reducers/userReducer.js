import userService from "../services/users"

export const init_users = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: "INIT_USERS",
            users: users
        })
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
    case "INIT_USERS":
        return action.users
    default: return state
    }
}

export default reducer