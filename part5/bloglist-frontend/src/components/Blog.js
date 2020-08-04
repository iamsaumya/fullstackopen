import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setUpdate }) => {

  const [showfull,setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleLikes = async () => {
    await blogService.updateBlog({
        id: blog.id,
        likes: blog.likes + 1
      })
    setUpdate(Math.floor(Math.random() * 1000))
  }

  const handleRemoving = async () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    
    if(result){
      await blogService.removeBlog({
        id: blog.id
      })
      setUpdate(Math.floor(Math.random()*100))  
    }
  }

  const showFullBlog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => handleLikes()}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={()=>handleRemoving()}>Remove</button>
      </div>    
      )
  }

  return (
    <div style={blogStyle}>
      <b>{blog.title}</b> <button onClick={() => setShowFull(!showfull)}>{showfull ? "hide": "view"}</button>
      {showfull && showFullBlog()}
    </div>
  )
  }

export default Blog
