import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import CountrySearch from './components/CountrySearch';
import CountryResults from './components/CountryResults';
import CountryView from './components/CountryView';

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
        setCountryList(filteredResponse)
      })
  }
  , [userCountry])

  const fillCountrySearch = (country) => {
    setCountryList([country])
  } 

  return (
    <div>
      <CountrySearch getCountryName={getCountryName} userCountry={userCountry} />
      <CountryResults countryList={countryList} fillCountrySearch={fillCountrySearch} />
      <CountryView countryList={countryList} />
    </div>
  );
}

export default App;
