import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/AnecdoteFilter'
import { useDispatch } from 'react-redux'
import ancedoteService from './services/anecdote'
import { initializeAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    ancedoteService
    .getAnecdotes()
    .then(anecdotesFromAPI => dispatch(initializeAnecdote(anecdotesFromAPI)))
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App