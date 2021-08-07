import React, { useState } from "react"
import PropTypes from "prop-types"
const Blog = ({ blog, user, blogLikeHandler, handleBlogRemoval }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async (event) => {
        event.preventDefault()
        const blogObject = {
            likes: blog.likes + 1,
            user: blog.user,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        blogLikeHandler(blog.id, blogObject)

    }
    const handleRemove = async (event) => {
        event.preventDefault()
        handleBlogRemoval(blog)
    }

    const [visible, setVisible] = useState(false)
    return(
        <div className="blog" style={blogStyle}>
      "{blog.title}", by {blog.author}
            <button
                className="expandButton"
                onClick={() => setVisible(!visible)}>
                {visible ? "hide":"show"}
            </button>
            {visible && <div className ="hiddenContent">
                <div>{blog.url}</div>
                <div>likes: {blog.likes}
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
    user: PropTypes.object.isRequired,
    blogLikeHandler: PropTypes.func.isRequired,
    handleBlogRemoval: PropTypes.func.isRequired
}

export default Blog