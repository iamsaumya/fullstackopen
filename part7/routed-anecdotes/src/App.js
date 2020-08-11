import React, { useState } from 'react'
import CreateNew from './Components/createNew'
import About from './Components/About'
import Footer from './Components/Footer'
import Menu from './Components/Menu'
import AnecdoteList from './Components/AnecdoteList'
import Anecdote from './Components/Anecdote'
import { Switch, Route, useHistory } from 'react-router-dom'

const App = () => {
  const history = useHistory()
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
    history.push('/')
    setNotification(anecdote.content + 'created!')
    setTimeout(() => setNotification(''),10000)
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
        <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification}
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdotes={anecdotes}/>
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <Footer />
      </div>
  )
}

export default App;
