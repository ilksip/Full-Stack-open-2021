import React, { useState } from "react"
import { add_blog } from "../../../../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
const BlogCreation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const submitHandler = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        dispatch(add_blog(blogObject, user))

        setTitle("")
        setAuthor("")
        setUrl("")
    }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>create a new blog</button>
            </div>
            <div style={showWhenVisible}>
                <h2>create new blog</h2>
                <form onSubmit={submitHandler}>
                    <div>
                        title:<input
                            id="title" type="text" value={title} name="title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:<input
                            id="author" type="text" value={author} name="author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:<input
                            id="url" type="text" value={url} name="url"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button id="blogSubmit" type="submit" onClick={() => setVisible(false)}>submit</button>
                </form>
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>

        </div>
    )
}

export default BlogCreation