import React, {useState} from 'react'
const Blog = ({blog, blogLikeHandler}) => {
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
      </div>
    </div>  
  )
}
  
  
export default Blog