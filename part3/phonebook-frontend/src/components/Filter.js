const Filter = ({ getFilter, nameFilter }) => {
  return (
    <div>
      Filter names with <input onChange={getFilter} value={nameFilter}></input>
    </div>
  )
}

export default Filter