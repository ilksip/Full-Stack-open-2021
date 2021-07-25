import React, { useState, useEffect } from 'react'
import Form from "./components/Form"
import Filter from "./components/Filter"
import Display from "./components/Display"
import Notification from "./components/Notification"
import contactService from "./services/contactService"
const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService.getContacts()
    .then(response => setPersons(response.data))
  },[])

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const handleError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    const existingContact = persons.find((person) => person.name === newName)
    if (existingContact) {
      if(window.confirm(`${newName} is already added to phonebook Replace the old number with a new one?`)){
        const updatedContact = {...existingContact, number: newNumber}
        contactService.editContact(updatedContact)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingContact.id ? person : response.data))
          handleMessage(`${existingContact.name}'s number was changed successfully.`)
        }).catch(error => {
          handleError(`${newName} was already removed from the server`)
        })
        
        
      }
    } 
    else {
      const newPerson = {name: newName, number: newNumber}
      contactService.createContact(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        handleMessage(`Added ${newName}`)
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
      <Notification.Message message={message}/>
      <Notification.ErrorMessage message={errorMessage}/>
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