import React, { useState, useEffect } from "react"

import "../weathersearch/weathersearch.css"

const WeatherSearch = () => {
  const [weather, setWeather] = useState({
      location: "", 
      country: "",
      currentTemp: 0,
      maxTemp: 0,
      minTemp: 0,
      humidity: 0,
      skies: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&APPID=b224698208e2070675e548d5b0911143")
                .then(response => {
                    if (response.status !== 200) {
                        console.log(`There was a problem: ${response.status}`);
                        return;
                    }
                    response.json().then((weatherdata) => {
                        // console.log(weatherdata)
                        // console.log(weatherdata.name)
                        // console.log(weatherdata.sys.country)
                        // console.log(Math.round(weatherdata.main.temp))
                        // console.log(Math.round(weatherdata.main.temp_max))
                        // console.log(Math.round(weatherdata.main.temp_min))
                        // console.log(weatherdata.main.humidity)
                        // console.log(weatherdata.weather[0].description)

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
                        //console.log(weather)
                    })
                })
        }
        fetchData()        
    }, {})

    console.log(weather)
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
        </div>
    )
}

export default WeatherSearch

