import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addVote, } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes
        .filter(anecdote => anecdote.content
            .toLowerCase()
            .includes(filter.toLowerCase())))
    
    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(setNotification(`You voted "${content}"`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
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
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}
export default AnecdoteList