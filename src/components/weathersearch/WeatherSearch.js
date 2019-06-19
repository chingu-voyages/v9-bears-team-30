import React, { useState, useEffect } from "react"

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

                        // const weatherUpdate = {
                        //     location: weatherdata.name,
                        //     country: weatherdata.sys.country,
                        //     currentTemp: weatherdata.main.temp,
                        //     maxTemp: weatherdata.main.temp_max,
                        //     minTemp: weatherdata.main.temp_min,
                        //     humidity: weatherdata.main.humidity,
                        //     skies: weatherdata.weather[0].description
                        // }

                        // setWeather(weatherUpdate)
                        // console.log(weather)
                        return weatherdata
                    })
                })
            console.log(result)
        }
        fetchData()        
    }, )
    return (
        <div></div>
    )
}

export default WeatherSearch

