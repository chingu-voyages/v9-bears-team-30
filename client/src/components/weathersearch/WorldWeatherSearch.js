import React, { useState, useEffect } from "react"

import "./weathersearch.css"

const WorldWeatherSearch = (props) => {
    const [coordinates, setCoordinates] = useState({ latitude: 28.65, longitude: 77.22 })
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
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
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER}`)
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
        props.click(city, country)
    }
    const getLocalWeather = async (event) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const localCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
            setCoordinates(localCoordinates)
        })

        event.preventDefault()

        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER}`)
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
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER}`)
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
    }, [coordinates])

    return (
        <div className="search-wrapper">
            <h3 id="title">
                Weather for {weather.location ? weather.location : "Data Loading..."}, {weather.country ? weather.country: "Data Loading..."}
            </h3>
            <div className="weather-data">
                <div className="temp">
                    <div className="temp">
                        <h4>Current Temperature</h4>
                        <p> {weather.currentTemp ? Math.round(weather.currentTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                    <div className="temp">
                        <h4>Today&apos;s Minimum</h4>
                        <p> {weather.minTemp ? Math.round(weather.minTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                    <div className="temp">
                        <h4>Today&apos;s Maximum</h4>
                        <p> {weather.maxTemp ? Math.round(weather.maxTemp) : "Data Loading..."} &#176;C</p>
                    </div>
                    <div className="temp">
                        <h4>Humidity</h4>
                        <p> {weather.humidity ? Math.round(weather.humidity) : "Data Loading..."} %</p>
                    </div>
                    <div className="temp">
                        <h4>Skies</h4>
                        <p> {weather.skies ? weather.skies : "Data Loading..."}</p>
                    </div>
                </div>
                <div className="temp">
                    <button id="local-weather" type="submit" onClick={getLocalWeather}>
                        My Local Weather
                    </button>
                    <h4 id="climate-data">Display Climate Data</h4>
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
                            <label htmlFor="city">Country (Example: US)</label>
                            <input
                                type="text"
                                placeholder="State name (case sensitive)"
                                value={country}
                                onChange={event => {
                                    event.preventDefault()
                                    setCountry(event.target.value)
                                }}
                            />
                        </div>
                        <button id="remote-weather" type="submit" onClick={getRemoteWeather}>
                            Get Climate Data
                        </button>
                        <p id="message">Only country data will be displayed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorldWeatherSearch

