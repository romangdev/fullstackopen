import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [userCountry, setUserCountry] = useState('')
  const [countryList, setCountryList] = useState([])

  const getCountryName = (e) => {
    setUserCountry(e.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const filteredResponse = response.data.filter(country => {
          const lowerCaseName = country.name.common.toLowerCase()
          return lowerCaseName.includes(userCountry)
        })
        console.log(filteredResponse)
        setCountryList(filteredResponse)
      })
  }
  , [userCountry])

  return (
    <div>
      <div>
        <label htmlFor='country-input'>Search Countries</label>
        <input id='country-input' onChange={getCountryName} value={userCountry}></input>
      </div>
      <div>
        {countryList.length > 10 ?
          'Too many matches, please keep typing'
          :
          countryList.map(country => <div key={country.name.common}>{country.name.common}</div>)
        }
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
    </div>
  );
}

export default App;
