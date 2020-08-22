import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  ALL_BOOKS_WITH_GENRE
} from '../queries'

const NewBook = (props) => {
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
      {
        query: ALL_BOOKS_WITH_GENRE,
        variables: { genre: props.user.favoriteGenre }
      }
    ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
      setTimeout(() => props.setError(null), 5000)
    }
  })
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const intPublished = parseInt(published)
    createBook({ variables: { title, author, intPublished, genres } })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
