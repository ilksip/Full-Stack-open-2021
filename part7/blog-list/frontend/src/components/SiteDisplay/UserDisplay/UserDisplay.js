import React, { useState, useEffect } from "react"
import userService from "../../../services/users"
import UserList from "./UserList"
import IndividualUser from "./IndividualUser"
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

const UserDisplay = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll()
            .then(response => {
                setUsers(response)
                console.log(response)
            })
    }, [])
    return(

        <Router>
            <Switch>
                <Route path="/users/:id">
                    <IndividualUser users={users}/>
                </Route>
                <Route path="/">
                    <UserList users = {users}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default UserDisplay