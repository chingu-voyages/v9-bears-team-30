import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import "./worldmap.css"

class WorldMap extends Component {
    constructor() {
        super();
        this.state = {
            worlddata: [],
            cities: [
                {
                    name: "Tokyo",
                    coordinates: [139.69, 35.6895],
                    temp: 0,
                    cityid: 1850147
                },
                {
                    name: "Jakarta",
                    coordinates: [106.865, -6.1751],
                    temp: 0,
                    cityid: 1642911
                },
                {
                    name: "Delhi",
                    coordinates: [77.1025, 28.7041],
                    temp: 0,
                    cityid: 1273294
                },
                {
                    name: "Beijing",
                    coordinates: [116.4074, 39.9042],
                    temp: 0,
                    cityid: 1816670
                },
                {
                    name: "New York",
                    coordinates: [-74.0059, 40.7128],
                    temp: 0,
                    cityid: 5128581
                },
                {
                    name: "Sao Paulo",
                    coordinates: [-46.6333, -23.5505],
                    temp: 0,
                    cityid: 3448439
                },
                {
                    name: "Mexico City",
                    coordinates: [-99.1332, 19.4326],
                    temp: 0,
                    cityid: 3530597
                },
                {
                    name: "Moscow",
                    coordinates: [37.6173, 55.7558],
                    temp: 0,
                    cityid: 524901
                },
                {
                    name: "Riyadh",
                    coordinates: [46.72, 24.69],
                    temp: 0,
                    cityid: 108410
                },
                {
                    name: "Los Angeles",
                    coordinates: [-118.2437, 34.0522],
                    temp: 0,
                    cityid: 5368361
                },
                {
                    name: "Bangkok",
                    coordinates: [100.5018, 13.7563],
                    temp: 0,
                    cityid: 1609350
                },
                {
                    name: "Buenos Aires",
                    coordinates: [-58.3816, -34.6037],
                    temp: 0,
                    cityid: 3435910
                },
                {
                    name: "Fairbanks",
                    coordinates: [-147.72, 64.84],
                    temp: 0,
                    cityid: 5861897
                },
                {
                    name: "Marrakech",
                    coordinates: [-8.01, 31.64],
                    temp: 0,
                    cityid: 6547285
                },
                {
                    name: "Cape Town",
                    coordinates: [18.42322, -33.92584],
                    temp: 0,
                    cityid: 3369157
                },
                {
                    name: "Milan",
                    coordinates: [9.919, 45.46],
                    temp: 0,
                    cityid: 6542283
                },
                {
                    name: "Kinshasa",
                    coordinates: [15.2663, -4.4419],
                    temp: 0,
                    cityid: 2314302
                },
                {
                    name: "Warsaw",
                    coordinates: [21.01, 52.23],
                    temp: 0,
                    cityid: 756135
                },
                {
                    name: "Winnipeg",
                    coordinates: [-97.15, 49.88],
                    temp: 0,
                    cityid: 6183235
                },
                {
                    name: "Melbourne",
                    coordinates: [144.96, -37.81],
                    temp: 0,
                    cityid: 2158177
                }
            ]
        };

        this.handleCountryClick = this.handleCountryClick.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }
    textColor(t) {
        if (t < 8) return "blue"
        if (t >= 8 && t < 12) return "lightblue"
        if (t >= 12 && t < 18) return "lightgreen"
        if (t >= 18 && t < 26) return "yellow"
        if (t >= 26 && t < 34) return "orange"
        if (t >= 34) return "orangered"
    }
    projection() {
        return geoMercator()
            .scale(120)
            .translate([750 / 2, 500 / 2]);
    }
    handleCountryClick(countryIndex) {
        console.log("Clicked on country: ", this.state.worlddata[countryIndex]);
    }
    handleMarkerClick(i) {
        console.log("Marker: ", this.state.cities[i]);
    }
    componentDidMount() {
        fetch(
            "../../public/worldmap.json"
        ).then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(worlddata => {
                this.setState({
                    worlddata: feature(worlddata, worlddata.objects.countries1)
                        .features
                });
            });
        });

        fetch("http://api.openweathermap.org/data/2.5/group?id=1850147,1642911,1273294,1816670,5128581,3448439,3530597,524901,108410,5368361,1609350,3435910,3369157,2314302,6547285,6183235,5861897,2158177,756135,6542283&units=metric&APPID=b224698208e2070675e548d5b0911143")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`);
                    return;
                }
                response.json().then(weatherdata => {
                    let citiesCopy = this.state.cities.slice(0)
                    weatherdata.list.forEach(item => {
                        citiesCopy.forEach(city => {
                            if (city.name === item.name) {
                                city.temp = Math.round(item.main.temp)
                            }
                        })
                    })
                    this.setState({
                        cities: citiesCopy
                    })
                })
            })
    }
    render() {
        return (
            <div className="map-wrapper">
                <svg width={`100vw`} height={`120vh`} viewBox="0 0 800 500">
                    <g className="countries">
                        {this.state.worlddata.map((d, i) => (
                            <path
                                key={`path-${i}`}
                                d={geoPath().projection(this.projection())(d)}
                                className="country"
                                // fill={`rgba(97,56,11,${(1 / this.state.worlddata.length) *
                                //   i})`}
                                fill="#2A1B0A"
                                stroke="#6E6E6E"
                                strokeWidth={0.5}
                                onClick={() => this.handleCountryClick(i)}
                            />
                        ))}
                    </g>
                    <g className="markers">
                        {this.state.cities.map((city, i) => (
                            <svg key={i}>
                                <circle
                                    key={`marker-${i}`}
                                    cx={this.projection()(city.coordinates)[0]}
                                    cy={this.projection()(city.coordinates)[1]}
                                    r={2}
                                    fill="#FFFFFF"
                                    //stroke="#FFFFFF"
                                    className="marker"
                                    onClick={() => this.handleMarkerClick(i)}
                                />
                                <text
                                    className="temp-text"
                                    x={this.projection()(city.coordinates)[0]}
                                    y={this.projection()(city.coordinates)[1]}
                                    fill={this.textColor(city.temp)}
                                    onClick={() => this.handleMarkerClick(i)}
                                >
                                    {city.name} {city.temp} &#176;C
                                </text>
                            </svg>
                        ))}
                    </g>
                    <g className="more-info">
                        <text
                            className="bottom-text"
                            x="40%"
                            y="75%"
                            fill="white"
                            >
                           ↓ Search Options ↓
                        </text>
                    </g>
                </svg>
                <div id="bottom"/>
            </div>
        );
    }
}

export default WorldMap;
