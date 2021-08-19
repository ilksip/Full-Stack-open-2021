import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogList"
import { useSelector } from "react-redux"

const App = () => {
    const notification = useSelector(state => state.notification)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = window.localStorage.getItem("loggeduser")
        if (user) {
            const parsedUser = JSON.parse(user)
            blogService.setToken(parsedUser.token)
            setUser(parsedUser)
        }
    }, [])

    return (
        <div>
            <Notification message={notification} />
            <LoginForm
                user = {user}
                setUser = {setUser}
            />
            <BlogForm
                user={user}
                setUser={setUser}
            />
        </div>
    )
}

export default App