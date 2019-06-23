import React from "react"

import WeatherSearch from "../../weathersearch/WeatherSearch"
import DataViz from "../../weathersearch/DataViz"
import "./citydata.css"

const CityData = () => {
    return (
       <div className="page-wrapper">
           <div className="column">
            <WeatherSearch />
           </div>
           <div className="column">
            <DataViz />
           </div>
       </div>

        
    )
}

export default CityData
