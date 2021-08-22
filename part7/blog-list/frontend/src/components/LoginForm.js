import React, { useState } from "react"
import { login } from "../reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"
const loginForm = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login(username, password))
        setUsername(""); setPassword("")
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