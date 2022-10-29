const CountryResults = ({ countryList, fillCountrySearch }) => {
  return (
    <div>
      {countryList.length > 10 ?
        'Too many matches, please keep typing'
        :
        countryList.map(country => {
          return (
            <div key={country.name.common}>
              {country.name.common} 
              <button onClick={() => fillCountrySearch(country)}>show</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default CountryResults