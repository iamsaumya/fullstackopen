import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
        <ListGroup>
          {blogs.map((blog) => (
				  <ListGroup.Item action key={blog.id} href={`/blogs/${blog.id}`}>
				    {blog.title}
				  </ListGroup.Item>
          ))}
        </ListGroup>}
    </div>
  )
}

export default Blogs
