
import blogService from "../services/blogs"
import { set_notification } from "./notificationReducer"
export const add_like = (blog) => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({
            type: "LIKE",
            data: { id: blog.id }
        })
    }
}
export const remove_blog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: "REMOVE",
            id: blog.id
        })
        dispatch(set_notification(`"${blog.title}" has been removed.`))
    }
}
export const add_blog = (blog, user) => {
    return async dispatch => {
        const newBlog = await blogService.post(blog)
        dispatch(set_notification(`A new blog "${newBlog.title}" by ${newBlog.author ? newBlog.author : user.name} added`))
        newBlog.user = user
        dispatch({
            type: "ADD_BLOG",
            data: newBlog
        })
    }
}

export const init_blogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })

    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
    case "ADD_BLOG":
        return [...state, action.data]
    case "INIT_BLOGS":
        return action.data
    case "LIKE": {
        const id = action.data.id
        const toChange = state.find(a => a.id === id)
        const changedBlog = { ...toChange, likes: toChange.likes + 1 }
        return state.map(blog => blog.id !== id ? blog : changedBlog)
    }
    case "REMOVE": {
        return state.filter(blog => blog.id !== action.id)
    }
    default: return state
    }
}

export default reducer