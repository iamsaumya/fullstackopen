import React, { useState, useEffect } from 'react'
import personService from '../services/persons'


const Persons = ({filterPersons,handleDelete}) => {
    return filterPersons.map((person) => <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id,person.name)}>delete</button></p>)
}

const PersonForm = ({setPersons, persons}) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPhonebook = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find((person) => person.name === newName)
    
    if( existingPerson !== undefined){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .putPerson(newPhonebook,existingPerson.id)
        .then((returnedPerson) => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        })
      }
    }
    else{
      personService
      .postPerson(newPhonebook)
      .then((returnedPerson)=>{
        setPersons(persons.concat(returnedPerson))
      })
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
  const [ persons, setPersons ] = useState([]) 

  const [ filter, setFilter ] = useState('')
  const [ filterPersons, setFilterPersons] = useState(persons)

  const handleFilterChange = (event) => {
      setFilter(event.target.value)
      setFilterPersons(persons.filter((person) => (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 )));
  }

  const handleDelete = (id,name) => {
    if(window.confirm(`Delete ${name}`)){
      personService
      .deletePerson(id)
      .then(()=>{
        personService
        .getPersons()
        .then(persons => {
          setPersons(persons)
        })
      })
    }
  }

  useEffect(() => {
      personService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
      
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input onChange={handleFilterChange} value={filter}></input>
      </div>
      <h2>add a new</h2>
      <PersonForm setPersons={setPersons} persons={persons}/>
      <h2>Numbers</h2>
      {filter === '' ? <Persons handleDelete={handleDelete} filterPersons={persons}/> : <Persons handleDelete={handleDelete} filterPersons={filterPersons}/>}
    </div>
  )
}

export default App
