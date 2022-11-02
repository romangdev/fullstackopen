import { useEffect, useState } from "react"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const getName = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameExists = checkDuplicateName(newName)
    if (nameExists) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const baseUrl = 'http://localhost:3001/persons'
      const newPersonObject = {
        name: newName,
        number: newNumber
      }

      axios.post(baseUrl, newPersonObject)

      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const checkDuplicateName = (newName) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return true;
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
      <Filter getFilter={getFilter} nameFilter={nameFilter} />
      <h2>Add New Contact</h2>
      <PersonForm handleSubmit={handleSubmit} getName={getName} newName={newName}
      getNumber={getNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App;
