import React from "react"
import { useSelector } from "react-redux"
import BlogList from "./BlogList/BlogList"
import UserDisplay from "./UserDisplay/UserDisplay"
import { useDispatch } from "react-redux"
import { logout } from "../../reducers/userReducer"
const SiteDisplay = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleLogout = () => {
        dispatch(logout())
    }
    if (!user) {
        return null
    }
    return(
        <div>
            <h1>blogs app</h1>
            <div>
                {user.name} logged in
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <UserDisplay/>
            <BlogList/>
        </div>
    )
}

export default SiteDisplay