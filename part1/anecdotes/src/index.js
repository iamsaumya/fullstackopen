import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({anecdote,points}) =>{

    return(
      <React.Fragment>
        <p>{anecdote}</p>
        <p>has {points} votes</p>
      </React.Fragment>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points,updatePoints] = useState(new Array(6).fill(0))
  const [maxPoints, updateMaxPoints] = useState(-1)

  function handleVote(){
    let points_copy = [
      ...points
    ]
    points_copy[selected] += 1
    updatePoints(points_copy)
  }

  function handleMaxPoints(){
    if(Math.max(...points) === 0)
      updateMaxPoints(-1)
    else
      updateMaxPoints(points.indexOf(Math.max(...points)))
  }

  useEffect(()=>{
      handleMaxPoints()
  })

  function getRandomAnecdotes() {
    let nextValue = Math.floor(Math.random() * 6)
    setSelected(nextValue)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} points={points[selected]}/>
      <button onClick={handleVote}>Vote</button>
      <button onClick={getRandomAnecdotes}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      {maxPoints !== -1 && <Anecdote anecdote={props.anecdotes[maxPoints]} points={points[maxPoints]}/>}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)