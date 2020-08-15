
const userReducer = (state = null,action) => {
    switch(action.type){
        case 'ADD_USER': {
            return action.data.user
        }
        default: return state
    }
}

export const setUser = (user) => {
    return {
        type: 'ADD_USER',
        data: {
            user
        }
    }
}

export default userReducer