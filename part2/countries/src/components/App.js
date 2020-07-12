import React, { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    margin: "20px"
}

const flagStyle = {
    width : "180px"
}

const ShowCountry = ({country}) => {
    
    const [weatherDetails, setWeatherDetails] = useState({})

    const {name,capital,population,languages,flag} = country
    const api_key = process.env.REACT_APP_API_KEY
    
    useEffect(()=>{
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then((response)=>{
            console.log(response.data)
            const {temperature,weather_icons,wind_speed,wind_dir} = response.data.current
            setWeatherDetails({
                temperature,
                weather_icons,
                wind_speed,
                wind_dir
            })
        })

    },[api_key,capital])

    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>Spoken Languages</h2>
            <ul>
            {languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={flag} alt="flag" style={flagStyle}></img>
            <h2>Weather at {capital}</h2>
            <p><b>temperature</b>: {weatherDetails.temperature} Celcius</p>
            <img src={weatherDetails.weather_icons} alt="weather icon"></img>
            <p><b>wind:</b> {weatherDetails.wind_speed} mph direction {weatherDetails.wind_dir}</p>
        </div>
    )
}

const ListCountries = ({query}) => {
    
    const [countries,setCountries] = useState([])
    const [country,setCountry] = useState({})

    useEffect(()=>{
        if(query !== ""){
            axios
            .get(`https://restcountries.eu/rest/v2/name/${query}`)
            .then((response) => {
                setCountries(response.data)
            })
        }
    })

    const handleShow = (country) => {
        setCountry(country)
    }

    return (
        <div>
            {countries.length > 10 && <p>too many matches, specify another filter</p>}
            {countries.length < 10 && countries.length !== 1 && countries.map((country) => <div key={country.name}>{country.name}<button onClick={() => handleShow(country)}>show</button></div>)}
            {country.languages !== undefined && <ShowCountry country={country}/>}
        </div>
    )

}

const App = () => {

    const [query,setQuery] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        setQuery(event.target.value)
    }

    return (
        <div style={style}>
            <div>
                find countries <input onChange={handleChange} value={query}></input>
            </div>     
            <ListCountries query={query}/>
        </div>
    )
}
export default App