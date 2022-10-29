const CountrySearch = ({ getCountryName, userCountry }) => {
  return (
    <div>
      <label htmlFor='country-input'>Search Countries</label>
      <input id='country-input' onChange={getCountryName} value={userCountry}></input>
    </div>
  )
}

export default CountrySearch