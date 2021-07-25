import React, { useState, useEffect } from 'react'
import axios from "axios"
import Form from "./components/Form"
import Filter from "./components/Filter"
import Display from "./components/Display"
const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  },[])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    }

    setNewName("")
    setNewNumber("")
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new contact</h2>
      <Form handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      newName={newName} newNumber={newNumber} addContact={addContact}/>
      
      <h2>Numbers</h2>
      <Display persons={persons} filter={filter}/>
    </div>
  )
}

export default App