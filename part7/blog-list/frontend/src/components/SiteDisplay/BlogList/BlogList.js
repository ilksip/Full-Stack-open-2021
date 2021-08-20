import React, { useEffect } from "react"
import BlogCreation from "./BlogCreation/BlogCreation"
import Blog from "./Blog/Blog"
import { init_blogs } from "../../../reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux"
const BlogForm = () => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(init_blogs())
    }, [])
    return (
        <div id="blogForm">
            <h2>blogs:</h2>
            <BlogCreation/>
            <div id="listOfBlogs">
                {blogs
                    .sort((a, b) => (b.likes - a.likes))
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                        />
                    )}
            </div>
        </div>
    )
}

export default BlogForm