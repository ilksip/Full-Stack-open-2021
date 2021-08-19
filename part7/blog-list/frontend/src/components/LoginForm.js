import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
const loginForm = ({ user, setUser, handleNotification }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user); setUsername(""); setPassword("")
            blogService.setToken(user.token)
            window.localStorage.setItem("loggeduser", JSON.stringify(user))
        } catch (exception) {
            handleNotification("Wrong credentials")
        }
    }

    if (user) {
        return null
    }
    return (
        <div>
            <h2>log in to view blogs</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input
                        id="username" type="text" value={username} name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:
                    <input
                        id="password" type="text" value={password} name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}
export default loginForm