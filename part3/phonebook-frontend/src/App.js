import { useEffect, useState } from "react"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from "./components/services/contact_services"
import './index.css'
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [contactUpdate, setContactUpdate] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  let errorExists = false

  useEffect(() => {
    console.log('USE EFFECT')
    contactService
    .getAll()
    .then(contacts => setPersons(contacts))
  }, [])

  const getName = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameExists = checkDuplicateName(newName)
    const nameDoesExist = nameExists[0]
    const existingPerson = nameExists[1]
    if (nameDoesExist) {
      handleNumberUpdate(existingPerson.id)
      setTimeout(() => {
        console.log('Error exists', errorExists)
        if (errorExists) {
          setErrorMessage(`Contact '${existingPerson.name}' has already been removed from server`)
          console.log('error set')
          errorExists = false
        } else {
          setContactUpdate(!contactUpdate)
          setSuccessMessage(`Updated ${existingPerson.name}'s number`)
          console.log('UPDATE set')
        }
      }, 50)
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      contactService.create(newPersonObject)
      setPersons(persons.concat(newPersonObject))
      setSuccessMessage(`Added ${newPersonObject.name}`)
    }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const handleNumberUpdate = (existingPersonID) => {
    if (window.confirm(`${newName} is already in the phonebook, 
        replace the old number with a new one?`)) {
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === existingPersonID) {
          const updatedContact = {
            ...persons[i],
            number: newNumber
          }
          errorExists = contactService.update(updatedContact, persons[i])
        }
      }
    }
  }

  const handleDelete = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.destroy(contact.id)
      setPersons(persons.filter(person => {
        return person.id !== contact.id
      }))
    } 

    return
  }

  const checkDuplicateName = (newName) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return [true, persons[i]];
      }
    }

    return false;
  }

  const getNumber = (e) => {
    setNewNumber((e.target.value).toLowerCase())
  }

  const getFilter = (e) => {
    setNameFilter(e.target.value)
  }

  const peopleToShow = persons.filter(person => {
    const name = person.name.toLowerCase()
    const subString = nameFilter.toLowerCase()
    return name.includes(subString) === true
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter getFilter={getFilter} nameFilter={nameFilter} />
      <h2>Add New Contact</h2>
      <PersonForm handleSubmit={handleSubmit} getName={getName} newName={newName}
      getNumber={getNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} people={persons} setPeople={setPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App;
