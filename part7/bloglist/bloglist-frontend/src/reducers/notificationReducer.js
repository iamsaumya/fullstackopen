let prevTimeID = 0

const notificationReducer = (state = {},action) => {
  switch(action.type){
  case 'SHOW_NOTIFICATION': {
    return action.data
  }
  default: return state
  }
}

export const showNotifcation = (message,time, variant) => {
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
        message,
        variant
      }
    })
  }
}

export default notificationReducer