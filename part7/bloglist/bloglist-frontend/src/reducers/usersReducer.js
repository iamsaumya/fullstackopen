
const usersReducer = (state = [],action) => {
  switch(action.type){
  case 'ADD_USERS': {
    return action.data.users
  }
  default: return state
  }
}

export const addUsers = (users) => {
  return {
    type: 'ADD_USERS',
    data: {
      users
    }
  }
}

export default usersReducer