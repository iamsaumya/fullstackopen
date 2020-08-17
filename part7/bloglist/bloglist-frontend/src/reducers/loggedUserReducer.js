
const loggedUserReducer = (state = null,action) => {
  switch(action.type){
  case 'ADD_USER': {
    return action.data.user
  }
  default: return state
  }
}

export const setLoggedUser = (user) => {
  return {
    type: 'ADD_USER',
    data: {
      user
    }
  }
}

export default loggedUserReducer