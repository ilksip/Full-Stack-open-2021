import React from "react"
import UserDisplay from "./UserDisplay/UserDisplay"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../reducers/loginReducer"
import BlogDisplay from "./BlogDisplay"
const SiteDisplay = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logout())
    }
    if (!user) {
        return null
    }

    return (
        <div>
            <h1>blogs app</h1>
            <div>
                {user.name} logged in
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <UserDisplay />
            <BlogDisplay />
        </div>
    )
}

export default SiteDisplay