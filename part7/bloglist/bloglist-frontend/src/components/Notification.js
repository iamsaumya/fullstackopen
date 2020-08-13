import React from 'react'

const Notification = ({ notify }) => {
  const { type,message } = notify
  return (
    <div className={type}>
      <p>{message}</p>
    </div>
  )
}

export default Notification