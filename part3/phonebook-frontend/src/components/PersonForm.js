const PersonForm = ({ handleSubmit, getName, newName, getNumber, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={getName} value={newName}/>
      </div>
      <div>
        number: <input onChange={getNumber} value={newNumber}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm