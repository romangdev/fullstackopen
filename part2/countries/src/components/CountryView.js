const CountryView = ({ countryList, temp, wind, weatherIcon }) => {
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
          <h2>Weather in {countryList[0].capital}</h2>
          <p>Temperature: {(temp - 273.5).toFixed(1)}°C / {((temp - 273.15) * 9/5 + 32).toFixed(1)}°F</p>
          <p>Weather:</p>
          <img src={weatherIcon} alt='current weather icon'></img>
          <p>Wind: {wind} m/s</p>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default CountryView