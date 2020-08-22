import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
const Login = ({ setToken, show, setError, setPage }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  })
  const loginSubmit = (e) => {
    e.preventDefault()
    login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value
      }
    })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result, setToken, setPage])

  if (!show) {
    return null
  }
  return (
    <form onSubmit={loginSubmit}>
      username:
      <input type="text" name="username" />
      password:
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
