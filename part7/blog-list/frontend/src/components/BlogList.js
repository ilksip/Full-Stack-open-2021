import React, { useEffect } from "react"
import BlogCreation from "./BlogCreation"
import Blog from "./Blog"
import { init_blogs } from "../reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux"

const BlogForm = ({ user, setUser, handleBlogRemoval, blogLikeHandler }) => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(init_blogs())
    }, [])
    const handleLogout = () => {
        window.localStorage.removeItem("loggeduser")
        setUser(null)
    }
    if (!user) {
        return null
    }
    return (
        <div id="blogForm">
            <h1>blogs app</h1>
            <div>
                {user.name} logged in
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <BlogCreation
                user={user}
            />
            <h2>blogs:</h2>
            <div id="listOfBlogs">
                {blogs
                    .sort((a, b) => (b.likes - a.likes))
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            blogLikeHandler={blogLikeHandler}
                            handleBlogRemoval={handleBlogRemoval}
                        />
                    )}
            </div>
        </div>
    )
}

export default BlogForm