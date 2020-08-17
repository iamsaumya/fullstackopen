import React,{ useState } from 'react'
import { Form,Button } from 'react-bootstrap'
const BlogForm = ({ addBlogs }) => {

  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [author,setAuthor] = useState('')
  const [likes,setLikes] = useState(0)

  const handleCreateBlog = (e) => {
    e.preventDefault()
    addBlogs({
      title,
      author,
      likes,
      url
    })
    setTitle('')
    setLikes('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={handleCreateBlog}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>Author</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>Url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Form.Label>Likes</Form.Label>
        <Form.Control
          id="likes"
          type="number"
          value={likes}
          name="likes"
          min="0"
          onChange={({ target }) => setLikes(target.value)}
        />
        <Button className="m-2"id='create-button' type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm