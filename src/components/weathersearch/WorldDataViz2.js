import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./dataviz.css"

const WorldDataViz2 = (props) => {
    const canvas = useRef(null)
    useEffect(() => {
        const city = props.location.city
        const country = props.location.country
        const years = Object.keys(props.data)
        const temps = Object.values(props.data)
        temps.length && drawBarChart(city, country, years, temps)
    }, [props.data])

    const drawBarChart = (city, country, years, temps) => {
        const margin = { top: 30, bottom: 60, right: 37, left: 30 },
            width = 500,
            height = 250;

        d3.select("svg").remove()

        var div = d3.select(canvas.current).append("div")
            .attr("id", "tooltip")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const svg = d3.select(canvas.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

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
            .attr("fill", "yellow")
            .text("Year (Starting From 1901)")

        const linearScale = d3.scaleLinear()
            .domain([d3.min(temps), d3.max(temps)])
            .range([0, height]);

        const scaledVals = temps.map(function (item) {
            return linearScale(item);
        });

        const yscale = d3.scaleLinear()
            .domain([d3.min(temps), d3.max(temps)])
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
            .attr("fill", "yellow")
            .text('Temperature (Celsius)')

        svg.append("text")
            .attr("x", 110)
            .attr("y", 15)
            .attr("class", "graph-title")
            .attr("fill", "white")
            .text(`Historical Temperature Data for ${country}`)
        svg.append("text")
            .attr("x", 200)
            .attr("y", 35)
            .attr("class", "graph-subtitle")
            .attr("fill", "white")
            .text("Average Temperature by Year")

        svg.selectAll('rect')
            .data(scaledVals)
            .enter()
            .append('rect')
            .attr('width', (width / temps.length))
            .attr('height', function (d) {
                return d;
            })
            .attr('fill', 'gold')
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
                div.html("Year: " + years[i] + "<br>" + "Avg Temp: " + temps[i] + "&#176;C")
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

export default WorldDataViz2
