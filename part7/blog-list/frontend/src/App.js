import React, { useEffect } from "react"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import { useSelector, useDispatch } from "react-redux"
import { checkLogin } from "./reducers/loginReducer"
import SiteDisplay from "./components/SiteDisplay/SiteDisplay"

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
            <SiteDisplay/>
        </div>
    )
}

export default App