import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleRemoving }) => {

  const [showfull,setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showFullBlog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} <button className="like" onClick={() => handleLikes(blog.id,blog.likes)}>like</button></p>
        <p>{blog.user.name}</p>
        <button className='remove-button' onClick={() => handleRemoving(blog)}>Remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <b>{blog.title}</b> <i>{blog.author}</i> <button onClick={() => setShowFull(!showfull)}>{showfull ? 'hide': 'view'}</button>
      {showfull && showFullBlog()}
    </div>
  )
}

export default Blog

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number.isRequired
  })
}