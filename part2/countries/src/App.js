import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import CountrySearch from './components/CountrySearch';
import CountryResults from './components/CountryResults';
import CountryView from './components/CountryView';

const App = () => {
  const [userCountry, setUserCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [currentCapital, setCurrentCapital] = useState('')
  const [currentCapTemp, setCurrentCapTemp] = useState('')
  const [currentCapWind, setCurrentCapWind] = useState('')
  const [currentCapWeather, setCurrentCapWeather] = useState('')

  const weather_api_key = process.env.REACT_APP_WEATHER_KEY

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

  useEffect(() => {
    if (countryList.length === 1) {
      setCurrentCapital(countryList[0].capital)
    }
  }, [countryList])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCapital}&appid=${weather_api_key}`)
      .then(response => {
        console.log(response)
        setCurrentCapTemp(response.data.main.temp)
        setCurrentCapWind(response.data.wind.speed)
        setCurrentCapWeather(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
  }, [currentCapital, weather_api_key])

  const fillCountrySearch = (country) => {
    setCountryList([country])
  } 

  return (
    <div>
      <CountrySearch getCountryName={getCountryName} userCountry={userCountry} />
      <CountryResults countryList={countryList} fillCountrySearch={fillCountrySearch} />
      <CountryView countryList={countryList} temp={currentCapTemp} wind={currentCapWind} weatherIcon={currentCapWeather} />
    </div>
  );
}

export default App;
