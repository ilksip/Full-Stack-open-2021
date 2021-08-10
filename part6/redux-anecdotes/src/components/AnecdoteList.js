import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes
        .filter(anecdote => anecdote.content
            .toLowerCase()
            .includes(filter.toLowerCase())))
    
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
    }
    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}
export default AnecdoteList