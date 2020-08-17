import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if(!user){
    console.log(user)
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default User
