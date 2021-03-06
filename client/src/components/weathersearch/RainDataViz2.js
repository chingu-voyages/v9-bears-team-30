import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./dataviz.css"

const RainDataViz2 = (props) => {
    const canvas = useRef(null)
    useEffect(() => {
        const city = props.location.city
        const state = props.location.state
        const years = Object.keys(props.data)
        const rain = Object.values(props.data)
        rain.length && drawBarChart(city, state, years, rain)
    }, [props.data])

    const drawBarChart = (city, state, years, rain) => {
        const margin = { top: 30, bottom: 60, right: 41, left: 30 },
            width = 500,
            height = 250;

        d3.select("svg").remove()

        var div = d3.select(canvas.current).append("div")
            .attr("id", "tooltip")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const svg = d3.select(canvas.current)
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            .attr('preserveAspectRatio', 'xMinYMin')

        const xscale = d3.scaleLinear()
            .domain([d3.min(years), d3.max(years)])
            .range([0, width]);

        const xAxis = d3.axisBottom(xscale).tickFormat(d3.format("d"));

        svg.append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(60, 280)');

        svg.append('text')
            .attr("x", 225)
            .attr("y", 320)
            .attr("fill", "lightblue")
            .text("Year (Starting From 2010)")

        const linearScale = d3.scaleLinear()
            .domain([d3.min(rain), d3.max(rain)])
            .range([0, height]);

        const scaledVals = rain.map(function (item) {
            return linearScale(item);
        });

        const yscale = d3.scaleLinear()
            .domain([d3.min(rain), d3.max(rain)])
            .range([height, 0]);

        const yAxis = d3.axisLeft(yscale)

        svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(60, 30)');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -230)
            .attr('y', 15)
            .attr("fill", "lightblue")
            .text('Rainfall (millimeters)')

        svg.append("text")
            .attr("x", 110)
            .attr("y", 15)
            .attr("class", "graph-title")
            .attr("fill", "white")
            .text(`Climate Change Prediction for ${city}, ${state}`)
        svg.append("text")
            .attr("x", 200)
            .attr("y", 35)
            .attr("class", "graph-subtitle")
            .attr("fill", "white")
            .text("Total Annual Rainfall")

        svg.selectAll('rect')
            .data(scaledVals)
            .enter()
            .append('rect')
            .attr('width', (width / rain.length))
            .attr('height', function (d) {
                return d;
            })
            .attr('fill', 'dodgerblue')
            .attr('x', function (d, i) {
                return xscale(years[i]) + 60;
            })
            .attr('y', function (d, i) {
                return height - d + 30;
            })
            .on("mouseover", (d, i) => {
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9)
                div.html("Year: " + years[i] + "<br>" + "Avg Rain: " + rain[i] + " mm")
                    .style('left', (d3.event.pageX - 18) + 'px')
                    .style('top', (d3.event.pageY - 44) + 'px')
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
            });




    }
    return (
        <div className="viz-wrapper">
            <div id="canvas" ref={canvas}></div>
        </div>
    )
}

export default RainDataViz2