const CountryResults = ({ countryList }) => {
  return (
    <div>
      {countryList.length > 10 ?
        'Too many matches, please keep typing'
        :
        countryList.map(country => {
          return (
            <div key={country.name.common}>
              {country.name.common} 
              <button>show</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default CountryResults