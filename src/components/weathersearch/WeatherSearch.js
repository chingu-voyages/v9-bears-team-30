import React, { useState, useEffect } from "react"

import "../weathersearch/weathersearch.css"

const WeatherSearch = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 51.509865, longitude: -0.118092})
  const [city, setCity] = useState("")  
  const [weather, setWeather] = useState({
      location: "", 
      country: "",
      currentTemp: 0,
      maxTemp: 0,
      minTemp: 0,
      humidity: 0,
      skies: ""
    })

    navigator.geolocation.getCurrentPosition(function (position) {
        const localCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        setCoordinates(localCoordinates)
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=b224698208e2070675e548d5b0911143`)
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`);
                    return;
                }
                response.json().then((weatherdata) => {
                    const weatherUpdate = {
                        location: weatherdata.name,
                        country: weatherdata.sys.country,
                        currentTemp: weatherdata.main.temp,
                        maxTemp: weatherdata.main.temp_max,
                        minTemp: weatherdata.main.temp_min,
                        humidity: weatherdata.main.humidity,
                        skies: weatherdata.weather[0].description
                    }
                    setWeather(weatherUpdate)
                })
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=b224698208e2070675e548d5b0911143`)
                .then(response => {
                    if (response.status !== 200) {
                        console.log(`There was a problem: ${response.status}`);
                        return;
                    }
                    response.json().then((weatherdata) => {
                        const weatherUpdate = {
                            location: weatherdata.name,
                            country: weatherdata.sys.country,
                            currentTemp: weatherdata.main.temp,
                            maxTemp: weatherdata.main.temp_max,
                            minTemp: weatherdata.main.temp_min,
                            humidity: weatherdata.main.humidity,
                            skies: weatherdata.weather[0].description
                        }
                        setWeather(weatherUpdate)
                    })
                })    
        }
        fetchData()         
    },[coordinates])

    return (
        <div className="search-wrapper">
            <h3>Weather for {weather.location ? weather.location : "Data Loading..."}</h3>
            <div className="weather-data">
                <div className="temp">
                    <div className="temp">
                        <h3>Current Temperature</h3>
                        <p> {weather.currentTemp ? Math.round(weather.currentTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                    <div className="temp">
                        <h3>Today&apos;s Minimum</h3>
                        <p> {weather.minTemp ? Math.round(weather.minTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                    <div className="temp">
                        <h3>Today&apos;s Maximum</h3>
                        <p> {weather.maxTemp ? Math.round(weather.maxTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                </div>
                <div className="temp">
                    <div className="temp">
                        <h3>Humidity</h3>
                        <p> {weather.humidity ? Math.round(weather.humidity) : "Data Loading..."} %</p>
                    </div>
                    <div className="temp">
                        <h3>Skies</h3>
                        <p> {weather.skies ? weather.skies : "Data Loading..."}</p>
                    </div>
                </div>
            </div>
            <h3>See Weather Data For Another Location</h3>
            <div className="form-group">
                <label htmlFor="city">City (Example: Mumbai)</label>
                <input 
                    type="text"
                    value={city}
                    onChange={event => {
                        event.preventDefault()
                        setCity(event.target.value)
                    }}
                />
                <button type="submit" onClick={onSubmit}>
                    Get Weather
                </button>
            </div>
        </div>
    )
}

export default WeatherSearch

