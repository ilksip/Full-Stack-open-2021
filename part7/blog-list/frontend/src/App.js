import React, { useEffect } from "react"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogList"
import { useSelector, useDispatch } from "react-redux"
import { checkLogin } from "./reducers/userReducer"
const App = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkLogin())
    }, [])

    return (
        <div>
            <Notification message={notification} />
            <LoginForm/>
            <BlogForm/>
        </div>
    )
}

export default App