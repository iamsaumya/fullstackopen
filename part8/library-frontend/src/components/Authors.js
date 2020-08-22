import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, setError }) => {
  const [authors, setAuthors] = useState(null)
  const results = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (results.data) setAuthors(results.data.allAuthors)
  }, [results.data])

  const submit = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let setBornTo = parseInt(e.target.born.value)
    if (isNaN(setBornTo)) {
      setError('Enter the year')
      setTimeout(() => setError(null), 5000)
      return
    }
    updateAuthor({ variables: { name, setBornTo } })
    e.target.reset()
  }
  if (!show) {
    return null
  }

  if (results.loading) {
    return null
  }

  if (!authors || authors.length === 0) {
    return <div>No authors</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <select name="name">
            {authors.map((a) => {
              return (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              )
            })}
          </select>
          <div>
            born
            <input type="number" name="born" />
          </div>
          <button type="submit">Update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
