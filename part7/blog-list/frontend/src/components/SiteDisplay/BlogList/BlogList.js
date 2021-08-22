import React from "react"
import BlogCreation from "./BlogCreation/BlogCreation"

import { Link } from "react-router-dom"
const BlogForm = ({ blogs }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div id="blogForm">
            <h2>blogs:</h2>
            <BlogCreation/>
            <div id="listOfBlogs">
                {blogs
                    .sort((a, b) => (b.likes - a.likes))
                    .map(blog =>
                        <div key={blog.id} style={blogStyle}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default BlogForm