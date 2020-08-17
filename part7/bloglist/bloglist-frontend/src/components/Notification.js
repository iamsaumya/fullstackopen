import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { variant,message } = useSelector(state => state.notification)

  return (
    <React.Fragment>
      {message !== null &&
      <Alert variant={variant}>
        {message}
      </Alert>
      }
    </React.Fragment>
  )
}

export default Notification