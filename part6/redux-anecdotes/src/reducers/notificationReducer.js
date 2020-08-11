let prevTimeID = 0

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
        clearTimeout(prevTimeID)
        prevTimeID = setTimeout(() => dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                notification : null
            }
        }),time*1000)

        dispatch({
            type:'SHOW_NOTIFICATION',
            data: {
                notification
            }
        })
    }
}

export default notificationReducer