import React from "react"
import UserDisplay from "./UserDisplay/UserDisplay"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../reducers/loginReducer"
import BlogDisplay from "./BlogDisplay"
import { Switch, Route, Link } from "react-router-dom"
const SiteDisplay = () => {
    const padding = {
        "marginRight": 10
    }
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
            <div style={{ "backgroundColor": "lightgrey", "padding":5 }}>
                <Link style={padding} to="/users">users</Link>
                <Link style={padding} to="/blogs">blogs</Link>
                {user.name} logged in
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <h1>blogs app</h1>
            <Switch>
                <Route path="/users">
                    <UserDisplay />
                </Route>
                <Route path="/blogs">
                    <BlogDisplay />
                </Route>
            </Switch>
        </div>
    )
}

export default SiteDisplay