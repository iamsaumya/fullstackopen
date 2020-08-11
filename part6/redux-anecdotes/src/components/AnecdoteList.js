import React from 'react'
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showNotifcation} from '../reducers/notificationReducer'
const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
  
    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      props.voteAnecdote(anecdote)
      props.showNotifcation(`You voted '${anecdote.content}'`,5)
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

const mapStateToProps = (state) => {

    const filter = state.filter
    const anecdotes = state.anecdotes
    if(filter === ""){
        return {
            anecdotes
        };
    }
    return {anecdotes: anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1 )}

}

const mapDispatchToProps = {
    voteAnecdote,
    showNotifcation
}

const ConnectedAnecdoteList  = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList