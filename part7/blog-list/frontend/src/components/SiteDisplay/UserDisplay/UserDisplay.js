import React, { useState, useEffect } from "react"
import userService from "../../../services/users"
//import { useSelector, useDispatch } from "react-redux"
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
        <div>
            <h2>Users:</h2>
            <table>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {users.map(user =>
                    <tr key={user.id}>
                        <th>{user.name}</th>
                        <th>{user.blogs.length}</th>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default UserDisplay