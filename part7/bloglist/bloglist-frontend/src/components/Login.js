import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { showNotifcation } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Login = () => {

  const dispatch = useDispatch()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await blogService.login({ username,password })
      dispatch(setLoggedUser(user))
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogService.setToken(user.token)
    }
    catch(exception){
      dispatch(showNotifcation(exception.response.data.error,5))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


export default Login