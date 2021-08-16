import React, { useState } from "react"

import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"

import Footer from "./components/Footer"
import About from "./components/About"
import CreateAnecdote from "./components/CreateAnecdote"
import Notification from "./components/Notification"

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to="/" style={padding}>anecdotes</Link>
            <Link to="/create" style={padding}>create new</Link>
            <Link to="/about" style={padding}>about</Link>
        </div>
    )
}
const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>)}
      </ul>
    </div>
  )

const Anecdote = ({ anecdotes, anecdoteById }) => {
    const id = useParams().id
    const anecdote = anecdoteById(id)
    return(
        <div>
            <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
            <div>{`for more info see ${anecdote.info}`}</div>
            <div>{`has ${anecdote.votes} votes`}</div>

        </div>
    )
}


const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }
    const handleNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 10000);
    }

    return (
        <Router>
            <div>
                <h1>Software anecdotes</h1>
                <Menu />
                <Notification message={notification}/>
                <Switch>
                    <Route path="/anecdotes/:id">
                        <Anecdote anecdotes={anecdotes} anecdoteById={anecdoteById}/>
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/create">
                        <CreateAnecdote addNew={addNew}
                        handleNotification={handleNotification} />
                    </Route>
                    <Route path="/">
                        <AnecdoteList anecdotes={anecdotes} />
                    </Route>
                </Switch>
                
                <Footer />
            </div>
        </Router>
    )
}

export default App;