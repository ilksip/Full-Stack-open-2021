import React, { useState, useEffect } from 'react'
import Form from "./components/Form"
import Filter from "./components/Filter"
import Display from "./components/Display"
import contactService from "./services/contactService"
const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    contactService.getContacts()
    .then(response => setPersons(response.data))
  },[])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else {
      const newPerson = {name: newName, number: newNumber}
      contactService.createContact(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      
    }

    setNewName("")
    setNewNumber("")
  }
  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.deleteContact(contact.id)
      setPersons(persons.filter(person => person.id !== contact.id))
    }

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
      <Display persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default App