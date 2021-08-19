import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogList"
import { useSelector } from "react-redux"
const App = () => {
    const notification = useSelector(state => state.notification)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = window.localStorage.getItem("loggeduser")
        if (user) {
            const parsedUser = JSON.parse(user)
            blogService.setToken(parsedUser.token)
            setUser(parsedUser)
        }
    }, [])

    //BLOG HANDLERS
    const blogLikeHandler = async (id, blogObject) => {
        /*try {
            const updatedBlog = await blogService.put(id, blogObject)
            updatedBlog.user = blogObject.user
            setBlogs(blogs.map(blog => (blog.id === id) ? updatedBlog : blog))
        } catch (exception) {
            handleNotification("like failed :(")
        }*/
        console.log(id, blogObject, "like")
    }
    const handleBlogRemoval = async (blogObject) => {
        /*if (window.confirm(`Remove "${blogObject.title}" by ${blogObject.author}?`)) {
            try {
                await blogService.remove(blogObject.id)
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
                handleNotification("Blog successfully deleted!")
            } catch (exception) {
                handleNotification("Blog deletion failed")
            }
        }*/
        console.log("remove", blogObject)
    }

    return (
        <div>
            <Notification message={notification} />
            <LoginForm
                user = {user}
                setUser = {setUser}
            />
            <BlogForm
                user={user}
                setUser={setUser}
                handleBlogRemoval={handleBlogRemoval}
                blogLikeHandler={blogLikeHandler}
            />
        </div>
    )
}

export default App