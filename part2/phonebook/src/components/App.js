import React, { useState, useReducer } from 'react'

const Persons = ({filterPersons}) => {
    return filterPersons.map((person)=> <p key={person.name}>{person.name} {person.number}</p>)
}

const PersonForm = ({setPersons, persons}) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName) !== undefined){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name:newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
}

  return (
      <form onSubmit={handleSubmit}>
      <div>
        name: <input 
              onChange={handleNameChange} 
              value={newName}
              />
      </div>
      <div>
        number: <input 
              onChange={handleNumberChange} 
              value={newNumber}
              />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ filter, setFilter ] = useState('')
  const [ filterPersons, setFilterPersons] = useState(persons)

  const handleFilterChange = (event) => {
      console.log(event.target)
      setFilter(event.target.value)
      setFilterPersons(persons.filter((person) => (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 )));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input onChange={handleFilterChange} value={filter}></input>
      </div>
      <h2>add a new</h2>
      <PersonForm setPersons={setPersons} persons={persons}/>
      <h2>Numbers</h2>
      {filter === '' ? <Persons filterPersons={persons}/> : <Persons filterPersons={filterPersons}/>}
    </div>
  )
}

export default App
