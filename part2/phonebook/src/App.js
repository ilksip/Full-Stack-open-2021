import React, { useState } from 'react'
import Form from "./components/Form"
import Filter from "./components/Filter"
import Display from "./components/Display"
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
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