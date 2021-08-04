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
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
//get blogs on first site load
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
  const handleNotification = msg => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }
  const handleBlogCreation = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.post(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      handleNotification(`A new blog "${title}" by ${author?author:user.name} added`)
      setTitle(""); setAuthor(""); setUrl("");

    } catch(exception) {
      handleNotification("Blog creation failed")
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user); setUsername(""); setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem("loggeduser", JSON.stringify(user))
    } catch(exception) {
      handleNotification("Wrong credentials")
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggeduser")
    setUser(null)
  }
  const loginForm = () => {
    return(
        <div>
          <h2>log in to view blogs</h2>
          <form onSubmit={handleLogin}>
            <div>
                username: 
                <input
                type="text" value={username} name="Username"
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password: 
                <input
                type="text" value={password} name="Username"
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
  }
  const blogForm = () => {
    return(
      <div>
        <h1>blogs app</h1>
        <div>
          {user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
          </div>
          <BlogCreation
          handleBlogCreation={handleBlogCreation}
          title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl}
          />
        <h2>blogs:</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification}/>
      {user === null ?
        loginForm() : blogForm()}
    </div>
  )
  
}

export default App