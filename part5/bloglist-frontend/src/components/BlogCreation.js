import { useState } from "react"

  const BlogCreation = ({handleBlogCreation, title, setTitle, author, setAuthor, url, setUrl}) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    return(
      <div>
        <div style={hideWhenVisible}>
            <button onClick={() => setVisible(true)}>create a new blog</button>
        </div>
        <div style={showWhenVisible}>
            <h2>create new blog</h2>
            <form onSubmit={handleBlogCreation}>
            <div>
            title:<input
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
                url:<input
                type="text" value={url} name="url"
                onChange={({target}) => setUrl(target.value)}
            />
            </div>
            <button type="submit" onClick={() => setVisible(false)}>submit</button>
            </form>
            <button onClick={() => setVisible(false)}>cancel</button>
        </div>
        
      </div>
    )
  }

  export default BlogCreation