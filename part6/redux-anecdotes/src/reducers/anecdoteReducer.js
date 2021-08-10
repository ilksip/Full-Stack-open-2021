import anecdoteService from "../services/anecdotes"

export const addVote = (anecdote) => {
    return async dispatch => {
        await anecdoteService.vote(anecdote)
        dispatch({
            type: 'VOTE',
            data: {id: anecdote.id}
        })
    }
}

export const addAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch({
            type: "ADD_ANECDOTE",
            data: newAnecdote
        })
    }
}

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: "INIT_ANECDOTES",
            data: anecdotes
        })
        
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