import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <React.Fragment>
      {notification !== null && <div style={style}>{notification}</div>}
    </React.Fragment>
  )
}

export default Notification