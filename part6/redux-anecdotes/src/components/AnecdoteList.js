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
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        let id = "none"
        if (notification) {
            id = notification.timeoutId
        }
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted "${anecdote.content}"`, 5, id))
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