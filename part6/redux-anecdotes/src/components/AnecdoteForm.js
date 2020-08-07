import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const value = e.target.anecdote.value;
        e.target.anecdote.value = ''
        dispatch(createAnecdote(value))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input ype='text' name='anecdote'/></div>
            <button>create</button>
            </form>
        </div>
    )
}
 
export default AnecdoteForm