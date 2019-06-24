import React, { useState, useEffect } from "react"

import WeatherSearch from "../../weathersearch/USWeatherSearch"
import DataViz from "../../weathersearch/DataViz"
import DataViz2 from "../../weathersearch/DataViz2"
import "./citydata.css"

const CityData = () => {
    const [cityId, setCityId] = useState(1)
    const [climateData, setClimateData] = useState({})

    const getCityId = async (city, USState) => {
        console.log(city)
        console.log(USState)
        const url = 'https://app.climate.azavea.com/api/city/?page_size=1771'
        await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': 'Token' + ' 6bb4ad97d3a0b7a31082608e9a7971c163cce354' }
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(cityids => {
                //console.log(cityids.features)
                cityids.features.forEach(cityinfo => {
                    //console.log(cityinfo.properties.name)
                    if (city == cityinfo.properties.name && USState == cityinfo.properties.admin) {
                        // console.log(cityinfo.properties.name + ", " + cityinfo.properties.admin)
                        // console.log(cityinfo.id)
                        setCityId(cityinfo.id)
                    }
                })
               
            })
        })
    }

    useEffect(() => {
        const url = `https://app.climate.azavea.com/api/climate-data/${cityId}/RCP45/indicator/average_high_temperature/?years=2010:2050&units=C`

        fetch(url, {
            method: 'GET',
            headers: {'Authorization': 'Token'+ ' 6bb4ad97d3a0b7a31082608e9a7971c163cce354'}
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(weatherdata => {
                const weatherInfo = {}
                //console.log(weatherdata.data)
                const keys = Object.keys(weatherdata.data)
                keys.forEach(key => {
                    weatherInfo[key] = Math.round(100 * weatherdata.data[key].avg) / 100
                })
                //console.log(weatherInfo)
                setClimateData(weatherInfo)
            })
        })
    },[cityId])

    console.log("id " + cityId)
    console.log(climateData)

    let dataViz;
    let dataViz2;

    if (cityId === 1) {
        dataViz = <DataViz data={climateData} />
    } else {
        dataViz2 = <DataViz2 data={climateData} />
    }

    return (
       <div className="page-wrapper">
           <div className="column">
            <WeatherSearch click={getCityId}/>
           </div>
           <div className="column">
            {dataViz}
            {dataViz2}
           </div>
       </div>

        
    )
}

export default CityData