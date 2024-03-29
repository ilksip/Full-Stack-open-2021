import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseurl)
    return response.data
}
const create = async (anecdote) => {
    const object = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseurl, object)
    return response.data
}

const vote = async (anecdote) => {
    const url = `${baseurl}/${anecdote.id}`
    const votedFor = {...anecdote, votes: anecdote.votes + 1}
    axios.put(url, votedFor )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, vote }