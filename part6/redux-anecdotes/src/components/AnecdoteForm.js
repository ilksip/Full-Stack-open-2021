import React from "react"
import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ""
        let id = "none"
        if (props.notification) {
            id = props.notification.timeoutId
        }
        props.addAnecdote(anecdote)       
        props.setNotification(`You created "${anecdote}"`, 5, id)
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
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
const mapDispatchToProps = { addAnecdote, setNotification }
const connectedForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default connectedForm