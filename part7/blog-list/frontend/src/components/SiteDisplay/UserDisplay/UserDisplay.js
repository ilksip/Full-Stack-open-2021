import React, { useEffect } from "react"
import UserList from "./UserList"
import IndividualUser from "./IndividualUser"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { init_users } from "../../../reducers/userReducer"

const UserDisplay = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(init_users())
    }, [])

    const match = useRouteMatch("/users/:id")
    const user = match
        ? users.find(user => user.id === match.params.id)
        : null
    return(

        <Switch>
            <Route path="/users/:id">
                <IndividualUser user={user}/>
            </Route>
            <Route path="/">
                <UserList/>
            </Route>
        </Switch>
    )
}

export default UserDisplay