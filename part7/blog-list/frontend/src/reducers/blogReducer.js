
import blogService from "../services/blogs"

export const addVote = (blog) => {
    return async dispatch => {
        await blogService.vote(blog)
        dispatch({
            type: "VOTE",
            data: { id: blog.id }
        })
    }
}

export const add_blog = (blog, user) => {
    return async dispatch => {
        const newBlog = await blogService.post(blog)
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
    default: return state
    }
}

export default reducer