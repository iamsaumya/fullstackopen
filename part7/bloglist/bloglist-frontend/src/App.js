import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import {showNotifcation} from './reducers/notificationReducer'
import {setBlogs,initializeBlogs} from './reducers/blogReducer'
import {setUser} from './reducers/userReducer'
import {useDispatch, useSelector} from 'react-redux'
const App = () => {
  const dispatch  = useDispatch()
  const {blogs,user} = useSelector(state =>  { 
    return {blogs: state.blogs , user: state.user}
  })
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [update,setUpdate] = useState(null)

  const blogFormRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await blogService.login({ username,password })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      dispatch(showNotifcation(exception.response.data.error,5))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
  }

  const addBlogs = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      dispatch(setBlogs(blogObject))
      dispatch(showNotifcation(`a new blog ${blogObject.title} by ${blogObject.author}`,5))
    }
    catch(exception){
      dispatch(showNotifcation(exception.response.data.error,5))
      console.error(exception)
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
        dispatch(showNotifcation(exception.response.data.error,5))
      }
    }
  }

  useEffect(() => {
      dispatch(initializeBlogs())
  }, [update,dispatch])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      dispatch(setUser(user))
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
      <div>
        {user.name} logged in
      </div>
       <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <Notification/>
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