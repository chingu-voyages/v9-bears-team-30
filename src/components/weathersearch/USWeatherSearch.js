import React, { useState, useEffect } from "react"

import Layout from "../layouts/layout"
import "./weathersearch.css"

const WeatherSearch = (props) => {
//   const cites = ["Tokyo", "Jakarta", "Delhi", "Beijing", "New York", "Sao Paulo", "Mexico City", "Moscow", "Riyadh", "Los Angeles", "Bangkok", "Buenos Aires", "Fairbanks", "Marrakech", "Cape Town", "Milan", "Kinshasa", "Warsaw", "Winnipeg", "Melbourne"]
  const [coordinates, setCoordinates] = useState({ latitude: 40.73, longitude: -73.93})
  const [city, setCity] = useState("")
  const [USState, setUSState] = useState("")  
  const [weather, setWeather] = useState({
      location: "", 
      country: "",
      currentTemp: 0,
      maxTemp: 0,
      minTemp: 0,
      humidity: 0,
      skies: ""
    })


    const getRemoteWeather = async (event) => {
        event.preventDefault()
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.OPEN_WEATHER}`)
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
         props.click(city, USState)   
    }
    const getLocalWeather = async (event) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const localCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
            setCoordinates(localCoordinates)
        })
        
        event.preventDefault()
        
        await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=${process.env.OPEN_WEATHER}`)
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
                    console.log(weather)
                })
            })
        

    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=${process.env.OPEN_WEATHER}`)
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

    console.log(weather)

    return (
        <Layout>
            <div className="search-wrapper">
                <h3 id="title">Weather for {weather.location ? weather.location: "Data Loading..."}</h3>
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
                        <button id="local-weather" type="submit" onClick={getLocalWeather}>
                            Get Local Weather
                        </button>
                    </div>
                </div>
                {/* <h3>See Weather Data For Another Location</h3> */}
                <div className="form-group">
                    <div className="input">
                        <label htmlFor="city">City (Example: New York)</label>
                        <input
                            type="text"
                            placeholder="City name (case sensitive)"
                            value={city}
                            onChange={event => {
                                event.preventDefault()
                                setCity(event.target.value)
                            }}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="city">State (Example: NY)</label>
                        <input
                            type="text"
                            placeholder="State name (case sensitive)"
                            value={USState}
                            onChange={event => {
                                event.preventDefault()
                                setUSState(event.target.value)
                            }}
                        />
                    </div>
                    <button id="remote-weather" type="submit" onClick={getRemoteWeather}>
                        Get Remote Weather
                    </button>
                </div>
            </div>
        </Layout>
        
    )
}

export default WeatherSearch

