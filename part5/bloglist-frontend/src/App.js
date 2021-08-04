import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrormessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const user = window.localStorage.getItem("loggeduser")
    if (user) {
      const parsedUser = JSON.parse(user)
      setUser(parsedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user); setUsername(""); setPassword("")
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
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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