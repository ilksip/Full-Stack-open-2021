import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const UserList = () => {
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    if (!users) {
        return null
    }
    return(
        <div>
            <h2>Users:</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                            <th>{blogs.filter(blog => blog.user.username === user.username).length}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default UserList