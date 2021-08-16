import React, { useState } from "react"

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

import Footer from "./components/Footer"
import About from "./components/About"
import CreateAnecdote from "./components/CreateAnecdote"
import AnecdoteList from "./components/AnecdoteList"
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

    return (
        <Router>
            <div>
                <h1>Software anecdotes</h1>
                <Menu />
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/create">
                        <CreateAnecdote addNew={addNew} />
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