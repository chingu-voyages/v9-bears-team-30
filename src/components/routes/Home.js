import React from "react"

import Layout from "../layouts/layout"
import WorldMap from "../worldmap/WorldMap"
import WeatherSearch from "../weathersearch/WeatherSearch"

const Home = () => {
    return (
        <Layout>
            <WorldMap />
            {/* <WeatherSearch /> */}
        </Layout>
    )
}

export default Home

