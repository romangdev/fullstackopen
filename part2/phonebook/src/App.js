import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const getName = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameExists = checkDuplicateName(newName)
    if (nameExists) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      setPersons(persons.concat({
        name: newName
      }))
      setNewName('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={getName} value={newName}/>
        </div>
        <div>Debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App;
