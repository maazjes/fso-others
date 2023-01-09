import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList = ({data, filter, showDetails, setShowDetails}) => {
  const filtered = data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (filtered.length === 1) {
    return <CountryDetails countryData = {filtered[0]}/>
  }
  if (showDetails.length !== 0) {
    return <CountryDetails countryData = {showDetails}/>
  }
  return (
    <ul>{filtered.map(country => 
      <li key={country.name.common}>{country.name.common}
        <button onClick={() => setShowDetails(country)}>show</button>
      </li>)}
    </ul>
  )
}

const Languages = ({languageData}) => {
  const r = []
  for (var key in languageData) {
    r.push(<li key={languageData[key]}>{languageData[key]}</li>)
  }
  return r
}

const Weather = ({city}) => {
  const [weatherData, setWeatherData] = useState(undefined)
  const [coordinates, setCoordinates] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
      .then(response => {
        setCoordinates(response.data[0])
      })
  }, [city])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&exclude=hourly,daily,minutely,alerts&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [coordinates])

  if (weatherData !== undefined) {
    return (
      <div>
      <div>Temperature {weatherData.main.temp} celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      <div>Wind {weatherData.wind.speed} m/s</div>
      </div>
    )
  }
}

const CountryDetails = ({countryData}) => {
  return (
    <>
    <h2>{countryData.name.common}</h2>
    <p>capital {countryData.capital}<br></br>area {countryData.area}</p>
    <p><b>languages:</b></p>
    <ul>
      <Languages languageData={countryData.languages}/>
    </ul>
    <img width="160" src={countryData.flags.png}/>
    <h2>Weather in {countryData.capital}</h2>
    <Weather city={countryData.capital}/>
    </>
  )
}

const App = () => {
  const [showDetails, setShowDetails] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setData(response.data)
      })
  }, [])

  const handleNewFilter = event => {
    setNewFilter(event.target.value)
    setShowDetails("")
  }

  return (
    <div>
      find countries <input onChange={handleNewFilter}/>
      <CountriesList data ={data} filter={newFilter} showDetails={showDetails} setShowDetails={setShowDetails}/>
    </div>
  )
}

export default App