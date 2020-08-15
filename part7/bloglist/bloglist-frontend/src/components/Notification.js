import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <React.Fragment>
      {message !== null && <div style={style}>{message}</div>}
    </React.Fragment>
  )
}

export default Notification