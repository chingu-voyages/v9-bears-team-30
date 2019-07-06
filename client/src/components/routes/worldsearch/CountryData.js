import React, { useState, useEffect } from "react"

import Layout from "../../layouts/layout"
import WorldWeatherSearch from "../../weathersearch/WorldWeatherSearch"
import WorldDataViz from "../../weathersearch/WorldDataViz"
import WorldDataViz2 from "../../weathersearch/WorldDataViz2"
import "../search/citydata.css"

const CountryData = () => {
    const [countryCode, setCountryCode] = useState("IND")
    const [climateData, setClimateData] = useState({})
    const [locationInfo, setLocationInfo] = useState({ "city": "Delhi", "country": "IND" })

    // gets 3-letter country code for weather info lookup
    const getCountryCode = async (city, country) => {
        setLocationInfo({ "city": city, "country": country })
        const url = `http://api.worldbank.org/v2/country/${country}?format=json`
        await fetch(url, {
            method: 'GET'
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(countryInfo => {
               setCountryCode(countryInfo[1][0].id)
            })
        })

    }

    // Gets country weather info on state update based on 3-letter country code
    useEffect(() => {
        const url = `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/${countryCode}`

        fetch(url, {
            method: 'GET'
        }).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(weatherdata => {
                const weatherinfo = {}
                weatherdata.forEach(year => {
                    weatherinfo[year.year] = year.data
                })
                setClimateData(weatherinfo)
            })
        })
    }, [countryCode])

    let worldDataViz;
    let worldDataViz2;

    if (countryCode === "IND") {
        worldDataViz = <WorldDataViz location={locationInfo} data={climateData} />
    } else {
        worldDataViz2 = <WorldDataViz2 location={locationInfo} data={climateData} />
    }

    return (
        <Layout>
            <div className="page-wrapper">
                <div>
                    <WorldWeatherSearch click={getCountryCode} />
                </div>
                <div>
                    {worldDataViz}
                    {worldDataViz2}
                </div>
            </div>
        </Layout>
    )
}

export default CountryData
