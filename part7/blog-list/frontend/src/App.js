import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogCreation from "./components/BlogCreation"
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    //get blogs on first site load
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])
    //remember user login
    useEffect(() => {
        const user = window.localStorage.getItem("loggeduser")
        if (user) {
            const parsedUser = JSON.parse(user)
            blogService.setToken(parsedUser.token)
            setUser(parsedUser)
        }
    }, [])

    //NOTIFICATION
    const handleNotification = msg => {
        setNotification(msg)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    //BLOG HANDLERS
    const blogLikeHandler = async (id, blogObject) => {
        try {
            const updatedBlog = await blogService.put(id, blogObject)
            updatedBlog.user = blogObject.user
            setBlogs(blogs.map(blog => (blog.id === id) ? updatedBlog : blog))
        } catch (exception) {
            handleNotification("like failed :(")
        }
    }
    const handleBlogCreation = async (blogObject) => {
        try {
            const returnedBlog = await blogService.post(blogObject)
            returnedBlog.user = user
            setBlogs(blogs.concat(returnedBlog))
            handleNotification(`A new blog "${blogObject.title}" by ${blogObject.author ? blogObject.author : user.name} added`)
        } catch (exception) {
            handleNotification("Blog creation failed")
        }
    }
    const handleBlogRemoval = async (blogObject) => {
        if (window.confirm(`Remove "${blogObject.title}" by ${blogObject.author}?`)) {
            try {
                await blogService.remove(blogObject.id)
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
                handleNotification("Blog successfully deleted!")
            } catch (exception) {
                handleNotification("Blog deletion failed")
            }
        }
    }

    //LOGIN HANDLERS
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user); setUsername(""); setPassword("")
            blogService.setToken(user.token)
            window.localStorage.setItem("loggeduser", JSON.stringify(user))
        } catch (exception) {
            handleNotification("Wrong credentials")
        }
    }
    const handleLogout = () => {
        window.localStorage.removeItem("loggeduser")
        setUser(null)
    }

    //FORMS
    const loginForm = () => {
        return (
            <div>
                <h2>log in to view blogs</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username:
                        <input
                            id = "username" type="text" value={username} name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password:
                        <input
                            id = "password" type="text" value={password} name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id="login-button" type="submit">login</button>
                </form>
            </div>
        )
    }
    const blogForm = () => {
        return (
            <div id="blogForm">
                <h1>blogs app</h1>
                <div>
                    {user.name} logged in
                    <button onClick={() => handleLogout()}>logout</button>
                </div>
                <BlogCreation
                    handleBlogCreation={handleBlogCreation}
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

    return (
        <div>
            <Notification message={notification} />
            {user === null ?
                loginForm() : blogForm()}
        </div>
    )
}

export default App