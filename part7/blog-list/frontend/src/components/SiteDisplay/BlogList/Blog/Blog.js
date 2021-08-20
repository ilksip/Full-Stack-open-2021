import React, { useState } from "react"
import PropTypes from "prop-types"
import { add_like, remove_blog } from "../../../../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async (event) => {
        event.preventDefault()
        dispatch(add_like(blog))
    }
    const handleRemove = async (event) => {
        event.preventDefault()
        if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
            dispatch(remove_blog(blog))
        }
    }


    const [visible, setVisible] = useState(false)
    return(
        <div id="blogObject"className="blogObject" style={blogStyle}>
            "{blog.title}", by {blog.author}
            <button
                className="expandButton"
                onClick={() => setVisible(!visible)}>
                {visible ? "hide":"show"}
            </button>
            {visible && <div className ="hiddenContent">
                <div>{blog.url}</div>
                <div>
                    <span id="likesNumber" className="likesNumber">{blog.likes}</span> likes
                    <button id="likeButton" className="likeButton" onClick={handleLike}>like</button>
                </div>
                <div>poster: {blog.user.name}</div>
                <div>{blog.user.username === user.username ? <button onClick={handleRemove}>delete</button> :null}</div>
            </div>}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog