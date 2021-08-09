import React from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch(setNotification(`You created "${anecdote}"`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);

        dispatch(addAnecdote(newAnecdote))
        event.target.anecdote.value = ""
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm