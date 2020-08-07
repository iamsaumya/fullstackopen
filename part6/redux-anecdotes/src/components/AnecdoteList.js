import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList