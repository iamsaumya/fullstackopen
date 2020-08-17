import React, { useEffect, useRef, useState } from 'react'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'

import { showNotifcation } from './reducers/notificationReducer'
import { setBlogs, initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { addUsers } from './reducers/usersReducer'

import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import CompleteBlog from './components/CompleteBlog'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const padding = {
    padding: 20,
  }

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedBlogUser) {
      const savedUser = JSON.parse(loggedBlogUser)
      dispatch(setLoggedUser(savedUser))
      blogService.setToken(savedUser.token)
    }
  }, [dispatch])

  useEffect(() => {
    (async () => {
      const allUsers = await userService.getAll()
      console.log(allUsers)
      dispatch(addUsers(allUsers))
      setUsers(allUsers)
    })()
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setLoggedUser(null))
  }

  const addBlogs = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(setBlogs(blogObject))
      dispatch(
        showNotifcation(
          `a new blog ${blogObject.title} by ${blogObject.author}`,
          5
        )
      )
    } catch (exception) {
      dispatch(showNotifcation(exception.response.data.error, 5))
      console.error(exception)
    }
  }

  const createBlog = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm addBlogs={addBlogs} />
      </Togglable>
    )
  }

  const logout = () => {
    return (
      <React.Fragment>
        <em>{loggedInUser.name} logged in</em>
        <button onClick={handleLogout}>Logout</button>
      </React.Fragment>
    )
  }

  return (
    <div>
      <Notification />
      {loggedInUser === null && <Login />}
      {loggedInUser !== null && (
        <div>
          <div>
            <Link style={padding} to="/blogs">
							blogs
            </Link>
            <Link style={padding} to="/users">
							users
            </Link>
            {logout()}
          </div>
          <h1>blog app</h1>
          <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <CompleteBlog />
            </Route>
            <Route path="/">
              <div>
                {createBlog()}
                <Blogs />
              </div>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
