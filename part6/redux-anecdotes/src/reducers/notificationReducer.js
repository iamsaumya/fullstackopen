const notificationReducer = (state = null,action) => {
    switch(action.type){
        case 'SHOW_NOTIFICATION': {
            return action.data.notification
        }
        default: return state
    }
}

export const showNotifcation = (notification,time) => {
    return async dispatch => {
        dispatch({
            type:'SHOW_NOTIFICATION',
            data: {
                notification
            }
        })
        setTimeout(() => dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                notification: null
            }
        }),time*1000)
    }
}

export default notificationReducer