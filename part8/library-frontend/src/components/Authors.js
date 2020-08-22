import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
  })

  const submit = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let setBornTo = parseInt(e.target.born.value)
    if (isNaN(setBornTo)) {
      props.setError('Enter the year')
      setTimeout(() => props.setError(null), 5000)
      return
    }
    updateAuthor({ variables: { name, setBornTo } })
    e.target.reset()
  }
  if (!props.show) {
    return null
  }

  if (results.loading) {
    return null
  }
  let authors = results.data.allAuthors
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
  )
}

export default Authors
