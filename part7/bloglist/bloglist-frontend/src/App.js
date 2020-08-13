import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [update,setUpdate] = useState(null)
  const [notify,setNotify] = useState(null)

  const blogFormRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await blogService.login({ username,password })
      setUser(user)
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setNotify({ message: exception.response.data.error, type:'error' })
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlogs = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const response = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(response))
      setNotify({ message: `a new blog ${response.title} by ${response.author}`, type: 'success' })
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
    catch(exception){
      setNotify({ message: exception.response.data.error, type:'error' })
      setTimeout(() => {
        setNotify(null)
      },5000)
    }
  }

  const handleLikes = async (id,likes) => {
    await blogService.updateBlog({
      id: id,
      likes: likes + 1
    })
    setUpdate(Math.floor(Math.random() * 1000))
  }

  const handleRemoving = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if(result){
      try{
        await blogService.removeBlog({
          id: blog.id
        })
        setUpdate(Math.floor(Math.random()*100))  
      }
      catch(exception){
        setNotify({message: exception.response.data.error, type: 'error'})
      }
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [update])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const createBlog = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm
          addBlogs = {addBlogs}
        />
      </Togglable>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <Login
          handleSubmit={handleSubmit}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const logout = () => {
    return(
      <div>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      {notify !== null && <Notification notify={notify}/>}
      {user === null && loginForm()}
      {user !== null &&
        <div>
          <h2>blogs</h2>
          {logout()}
          {createBlog()}
          {blogs.sort((a,b) => a.likes > b.likes ? -1 : 1) && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemoving={handleRemoving}/>
          )}
        </div>
      }
    </div>
  )
}

export default App