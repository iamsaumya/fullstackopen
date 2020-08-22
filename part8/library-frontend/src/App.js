import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import {
  ME,
  BOOK_ADDED,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_BOOKS_WITH_GENRE
} from './queries'
const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const meQuery = useQuery(ME)
  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      setError('A new book is added')
      setTimeout(() => setError(null), 5000)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const updateCacheWith = ({ book, newAuthor }) => {
    console.log('inside updatecachewith', book, newAuthor)
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    if (!includedIn(dataInStore.allBooks, book)) {
      console.log('not found inside the cache')
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(book)
        }
      })
    } else {
      console.log('found inside the cache')
    }

    if (user) {
      if (book.genres.indexOf(user.favoriteGenre) !== -1) {
        console.log('the book is thriller')
        const userFavoriteBooks = client.readQuery({
          query: ALL_BOOKS_WITH_GENRE,
          variables: { genre: user.favoriteGenre }
        })
        console.log('userfavoritebooks', userFavoriteBooks)

        if (!includedIn(userFavoriteBooks.allBooks, book)) {
          console.log('new book is not in cache')
          client.writeQuery({
            query: ALL_BOOKS_WITH_GENRE,
            variables: { genre: user.favoriteGenre },
            data: {
              allBooks: userFavoriteBooks.allBooks.concat(book)
            }
          })
        }
      }
    }

    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    console.log(authorsInStore)

    if (!includedIn(authorsInStore.allAuthors, newAuthor)) {
      console.log('new author he is')
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorsInStore.allAuthors.concat({
            ...newAuthor,
            bookCount: 1
          })
        }
      })
    } else {
      console.log('found the author in the cache')
      const booksInStore = client.readQuery({ query: ALL_BOOKS })
      const bookCount = booksInStore.allBooks.reduce(
        (a, book) => (book.author.name === newAuthor.name ? a + 1 : a),
        0
      )
      const updatedAuthors = authorsInStore.allAuthors.map((author) => {
        return author.id === newAuthor.id ? { ...newAuthor, bookCount } : author
      })
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: updatedAuthors
        }
      })
    }
  }

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
      console.log(meQuery.data.me)
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
