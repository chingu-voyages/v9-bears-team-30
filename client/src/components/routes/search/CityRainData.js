import React, { useState, useEffect } from "react"

import Layout from "../../layouts/layout"
import USWeatherSearch from "../../weathersearch/USWeatherSearch"
import RainDataViz from "../../weathersearch/RainDataViz"
import RainDataViz2 from "../../weathersearch/RainDataViz2"
import "./citydata.css"

const CityRainData = () => {
    const [cityId, setCityId] = useState(1)
    const [climateData, setClimateData] = useState({})
    const [locationInfo, setLocationInfo] = useState({ "city": "New York", "state": "NY" })

    // Gets city id from azavea.com to use for looking up weather by city id
    const getCityId = async (city, USState) => {
        setLocationInfo({ "city": city, "state": USState })
        const url = 'https://app.climate.azavea.com/api/city/?page_size=1771'
        await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': 'Token' + ' ' + process.env.REACT_APP_AZAVEA_TOKEN }
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(cityids => {
                cityids.features.forEach(cityinfo => {
                    if (city == cityinfo.properties.name && USState == cityinfo.properties.admin) {
                        setCityId(cityinfo.id)
                    }
                })
            })
        })

    }

    // Gets city weather info on state update
    useEffect(() => {
        const url = `https://app.climate.azavea.com/api/climate-data/${cityId}/RCP85/indicator/total_precipitation/?years=2010:2099&agg=min,avg&units=mm`

        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': 'Token' + ' ' + process.env.REACT_APP_AZAVEA_TOKEN }
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(weatherdata => {
                console.log(weatherdata)
                const weatherInfo = {}
                const keys = Object.keys(weatherdata.data)
                keys.forEach(key => {
                    weatherInfo[key] = Math.round(100 * weatherdata.data[key].avg) / 100
                })
                setClimateData(weatherInfo)
            })
        })
    }, [cityId])

    let dataViz;
    let dataViz2;

    if (cityId === 1) {
        dataViz = <RainDataViz location={locationInfo} data={climateData} />
    } else {
        dataViz2 = <RainDataViz2 location={locationInfo} data={climateData} />
    }

    return (
        <Layout>
            <div className="page-wrapper">
                <div>
                    <USWeatherSearch click={getCityId} />
                </div>
                <div>
                    {dataViz}
                    {dataViz2}
                </div>
            </div>
        </Layout>
    )
}

export default CityRainData