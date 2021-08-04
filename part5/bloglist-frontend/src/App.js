import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login" 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrormessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
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

  const handleBlogAddition = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.post(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle(""); setAuthor(""); setUrl("");

    } catch(exception) {
      setErrormessage("Blog creation failed")
      setTimeout(() => {setErrormessage(null)}, 5000);
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
      setErrormessage("Wrong credentials")
      setTimeout(() => {setErrormessage(null)}, 5000);
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
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
          </div>
          {blogAddition()}
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const blogAddition = () => {
    return(
      <div>
        <h1>create new</h1>
        <form onSubmit={handleBlogAddition}>
          <div>
          title:
          <input
            type="text" value={title} name="title"
            onChange={({target}) => setTitle(target.value)}
          />
          </div>
          <div>
          author:<input
            type="text" value={author} name="author"
            onChange={({target}) => setAuthor(target.value)}
          />
          </div>
          <div>
          url:
          <input
            type="text" value={url} name="url"
            onChange={({target}) => setUrl(target.value)}
          />
          </div>
          <button type="submit">submit</button>
          </form>
      </div>
    )
  }

  return (
    <div>
      <p>{errorMessage}</p>
      {user === null ?
        loginForm() : blogForm()}
    </div>
  )
  
}

export default App