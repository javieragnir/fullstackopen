import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ name }) => <div style={{display: 'inline'}}>{name}</div>

const CountryDisplay = ({ countriesToShow, input, handleShowButton, weatherData }) => {
  const len = countriesToShow.length
  if (input === '') {
    return;
  }
  
  if ((len > 1) && (len <= 10)) {
    return (
      <>
      {countriesToShow.map(country => 
          <div key={country.cca3}>
            <Country name={country.name.common} />
            <span> </span>
            <button id={country.name.common} onClick={handleShowButton}>show</button>
          </div>
        )
      }
    </>
    )
  } else if (len === 1) {

    const country = countriesToShow[0]
    // Make sure weather data is loaded
    if (weatherData.name) {
      return (
        <div>
          <h2>{country.name.common}</h2>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h4>languages:</h4>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>
            )}
          </ul>
          <img src={country.flags.svg} alt='flag' style={{maxHeight: "100px"}}></img>
          <h3>Weather in {country.capital}</h3>
          <div>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</div>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
          <div>wind {weatherData.wind.speed} m/s</div>
        </div>
      )
    }
  } else if (len === 0) {
    return (
      <div>No matches</div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [input, setInput] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [coordinates, setCoordinates] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  // Update country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  // Update countries shown when filter is altered
  useEffect(() => {
    const newCountries = countryData.filter(country =>  
      country.name.common.toUpperCase().includes(input.toUpperCase()) 
    )
    setCountriesToShow(newCountries)
  }, [input, countryData])

  // Get coordinates
  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca3}&limit=${1}&appid=${api_key}`)
        .then(response => {
          setCoordinates(response.data[0])
        })
    }
  }, [countriesToShow])

  // Get weather data
  useEffect(() => {
    if (countriesToShow.length === 1) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }
    }, [coordinates])

  const handleInputChange = (event) => setInput(event.target.value)

  const handleShowButton = (event) => setCountriesToShow(countryData.filter(country =>
    country.name.common === event.target.id))

  

  return (
    <div>
      find countries <input value={input} onChange={handleInputChange}></input>
      <CountryDisplay countriesToShow={countriesToShow} input={input} handleShowButton={handleShowButton} weatherData={weatherData}/>
    </div>
  )
}

export default App