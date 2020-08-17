import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog,makeComment } from '../reducers/blogReducer'
import { showNotifcation } from '../reducers/notificationReducer'
import { Form,Button } from 'react-bootstrap'

const CompleteBlog = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const blog = blogs.find((blog) => blog.id === id)

  const handleComment = (e,id) => {
    e.preventDefault()
    const { comment } = e.target
    dispatch(makeComment(comment.value,id))
    e.target.reset()
  }

  const handleLikes = (id, likes) => {
    dispatch(addLike(id, likes + 1))
  }

  const handleRemoving = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      try {
        await dispatch(deleteBlog(blog.id))
        window.location.href = '/'
      } catch (exception) {
        dispatch(showNotifcation(exception.response.data.error, 5, 'danger'))
      }
    }
  }

  if (!blog) {
    console.log(blog)
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes}{' '}
          <Button
            className="like"
            onClick={() => handleLikes(blog.id, blog.likes)}
          >
						like
          </Button>
        </p>
        <p>{`added by ${blog.author}`}</p>
        <h3>comments</h3>
        <Form onSubmit={(e) => handleComment(e,blog.id)}>
          <Form.Group>
            <Form.Control type="text" name="comment"/>
          </Form.Group>
          <Button type="submit">add comment</Button>
        </Form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
        <Button click={() => handleRemoving(blog)}>Remove</Button>
      </div>
    </div>
  )
}

export default CompleteBlog
