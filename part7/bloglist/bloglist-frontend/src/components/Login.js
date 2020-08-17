import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { showNotifcation } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

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
      dispatch(showNotifcation('Successfully Logged In',5,'success'))
    }
    catch(exception){
      dispatch(showNotifcation(exception.response.data.error,5,'danger'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="username"
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="password"
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}/>
        </Form.Group>
        <Button id="login-button" type="submit">login</Button>
      </Form>
    </div>
  )
}


export default Login