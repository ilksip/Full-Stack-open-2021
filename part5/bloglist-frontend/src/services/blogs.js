import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const put = async (id, blog) => {
    const response = await axios.put(`${baseUrl}/${id}`, blog)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, post, setToken, put, remove }