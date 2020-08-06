import React,{ useState } from 'react'

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
      <form onSubmit={handleCreateBlog}>
        <div>
              title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
            likes:
          <input
            id="likes"
            type="number"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id='create-button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm