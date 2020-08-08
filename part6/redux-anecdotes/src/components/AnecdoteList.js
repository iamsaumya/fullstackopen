import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showNotifcation} from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter;
        const anecdotes = state.anecdotes
        if(filter === ""){
            return anecdotes;
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))
      dispatch(showNotifcation(`You voted '${anecdote.content}'`))
      setTimeout(() => {
          dispatch(showNotifcation(null))
      },5000)
    }

    return (
        <div>
            {anecdotes.sort((a,b) => a.votes < b.votes ? 1 : -1) && anecdotes.map(anecdote =>
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