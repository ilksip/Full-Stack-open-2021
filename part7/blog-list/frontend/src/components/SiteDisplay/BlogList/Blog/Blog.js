import React from "react"
import { add_like, remove_blog } from "../../../../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { set_notification } from "../../../../reducers/notificationReducer"
const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    if (!blog) {
        history.push("/")
        dispatch(set_notification("Blog does not exist!"))
        return(null)
    }

    const handleLike = async (event) => {
        event.preventDefault()
        dispatch(add_like(blog))
    }
    const handleRemove = async (event) => {
        event.preventDefault()
        if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
            dispatch(remove_blog(blog))
            history.push("/")
        }
    }

    return(
        <div>
            <h1>"{blog.title}", by {blog.author}</h1>
            <p>URL: {blog.url}</p>
            <div>
                <span id="likesNumber" className="likesNumber">{blog.likes}</span> likes
                <button id="likeButton" className="likeButton" onClick={handleLike}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
            <div>{blog.user.username === user.username ? <button onClick={handleRemove}>delete</button> :null}</div>
        </div>
    )
}

export default Blog