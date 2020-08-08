import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE_ANECDOTE': {
      return state.map(blog => blog.id === action.data ? {...blog,votes: blog.votes + 1}: blog)
    }
    case 'CREATE': {
      return [...state,action.data]
    }
    case 'INITIAL': {
      console.log('inside')
      return action.data
    } 
    default: return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote({...anecdote,votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: anecdote.id
    })
  }
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const response = await anecdoteService.createAnecdotes(newAnecdote)
    dispatch({
      type: 'CREATE',
      data: response
    })
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch({
      type: 'INITIAL',
      data: anecdotes
    })
  }
}

export default anecdoteReducer