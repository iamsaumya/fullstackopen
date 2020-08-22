import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED } from './queries'
const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const meQuery = useQuery(ME)
  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      setTimeout(() => setError(null), 5000)
    }
  })

  useEffect(() => {
    const savedtoken = localStorage.getItem('library-user-token', token)
    if (savedtoken) {
      setToken(savedtoken)
    }
  }, [token])

  const logout = () => {
    setToken(null)
    client.clearStore()
    localStorage.removeItem('library-user-token')
  }

  useEffect(() => {
    if (meQuery.data) {
      setUser(meQuery.data.me)
    }
  }, [meQuery])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('recommended')}>Recommended</button>
        )}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => logout()}>Logout</button>}
      </div>
      <div>{error}</div>
      <Authors show={page === 'authors'} setError={setError} />

      <Books show={page === 'books'} />

      {user && <Recommended show={'recommended' === page} />}

      {user && (
        <NewBook show={page === 'add'} user={user} setError={setError} />
      )}

      <Login
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />
    </div>
  )
}

export default App
