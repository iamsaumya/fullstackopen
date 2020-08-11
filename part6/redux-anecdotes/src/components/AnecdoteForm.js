import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showNotifcation} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (e) => {
        e.preventDefault()
        const value = e.target.anecdote.value;
        e.target.anecdote.value = ''
        const newAnecdote = {
            content : value,
            votes: 0
        }
        props.createAnecdote(newAnecdote)
        props.showNotifcation(`You created ${value}`,5)
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
 

const mapDispatchToProps = {
    createAnecdote,
    showNotifcation
}
const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm