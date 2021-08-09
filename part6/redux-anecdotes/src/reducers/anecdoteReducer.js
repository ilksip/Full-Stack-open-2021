
const getId = () => (100000 * Math.random()).toFixed(0)


export const addVote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const addAnecdote = (anecdote) => {
    return {
        type: "ADD_ANECDOTE",
        data: anecdote
    }
}

export const initAnecdotes = (anecdotes) => {
    return {
        type: "INIT_ANECDOTES",
        data: anecdotes
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case "VOTE":
            const id = action.data.id
            const toChange = state.find(a => a.id === id)
            const changedAnecdote = { ...toChange, votes: toChange.votes + 1 }
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        case "ADD_ANECDOTE":
            return [...state, action.data]
        case "INIT_ANECDOTES":
            return action.data
        default: return state
    }
}

export default reducer