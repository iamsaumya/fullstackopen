import React  from 'react'
import {useField} from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    console.log('inside handlesubmit')
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: author.info,
      votes: 0
    })
  }

  const resetForm = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name='content' {...content}/>
        </div>
        <div>
          author
          <input name='author' {...author}/>
        </div>
        <div>
          url for more info
          <input name='info' {...info}/>
        </div>
        <button type='submit' onClick={handleSubmit}>create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew