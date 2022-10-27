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
          countryList.map(country => <div key={country.car.ccn3}>{country.name.common}</div>)
        }
      </div>
    </div>
  );
}

export default App;
