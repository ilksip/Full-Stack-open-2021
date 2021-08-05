import React, {useState} from 'react'
const Blog = ({blog, user, blogLikeHandler, handleBlogRemoval}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
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
  const showWhenVisible = { display: visible ? "" : "none" }
  return(
    <div style={blogStyle}>
      "{blog.title}", by {blog.author} 
      <button 
        onClick={() => setVisible(!visible)}>
        {visible ? "hide":"show"}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes}
        <button onClick={handleLike}>like</button>
        </div>
        <div>poster: {blog.user.name}</div>
        <div>{blog.user.username === user.username ? <button onClick={handleRemove}>delete</button> :null}</div>
      </div>
    </div>  
  )
}
  
  
export default Blog