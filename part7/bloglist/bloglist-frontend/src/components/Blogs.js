import React from 'react'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
				blogs.map((blog) => (
				  <div key={blog.id} style={blogStyle}>
				    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
				  </div>
				))}
    </div>
  )
}

export default Blogs
