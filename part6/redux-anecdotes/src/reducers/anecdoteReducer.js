
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: id
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const initializeAnecdote = (anecdotes) => {
  return {
    type: 'INITIAL',
    data: anecdotes
  }
}

export default anecdoteReducer