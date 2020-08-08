import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showNotifcation} from '../reducers/notificationReducer'
import blogService from '../services/anecdote'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const value = e.target.anecdote.value;
        e.target.anecdote.value = ''
        const newAnecdote = {
            content : value,
            votes: 0
        }
        const response = await blogService.createAnecdotes(newAnecdote)
        console.log('response after creating',response)
        dispatch(createAnecdote(response))
        dispatch(showNotifcation(`You created ${value}`))
        setTimeout(() => {
            dispatch(showNotifcation(null))
        },5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input type='text' name='anecdote'/></div>
            <button>create</button>
            </form>
        </div>
    )
}
 
export default AnecdoteForm