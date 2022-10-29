const CountryView = ({ countryList }) => {
  return (
    <div>
      {countryList.length === 1 ?
        <div>
          <h2>{countryList[0].name.common}</h2>
          <p>Capital: {countryList[0].capital}</p>
          <p>Area: {countryList[0].area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(countryList[0].languages).map(language => {
              return <li key={language}>{language}</li>
            })}
          </ul>
          <div>
            <img src={countryList[0].flags.png} alt='Country flag'></img>
          </div>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default CountryView