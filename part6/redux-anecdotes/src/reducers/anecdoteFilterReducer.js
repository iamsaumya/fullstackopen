const anecdoteReducerFilter = (state = "", action) =>{
    switch(action.type){
        case 'SET_FILTER':{
            return action.data.filter
        }
        default: return state
    }
}

export const setFilter = (filter)=> {
    return {
        type: 'SET_FILTER',
        data: {
            filter
        }
    }
}

export default anecdoteReducerFilter