import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { init_blogs } from "../../reducers/blogReducer"
import Blog from "./BlogList/Blog/Blog"
import BlogList from "./BlogList/BlogList"
const BlogDisplay = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(init_blogs())
    }, [])
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch("/blogs/:id")
    const blog = match
        ? blogs.find(blog => blog.id === match.params.id)
        : null
    return (
        <Switch>
            <Route path="/blogs/:id">
                <Blog blog={blog} />
            </Route>
            <Route path="/">
                <BlogList blogs={blogs} />
            </Route>
        </Switch>
    )
}

export default BlogDisplay