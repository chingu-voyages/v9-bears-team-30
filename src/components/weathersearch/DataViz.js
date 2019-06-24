import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./dataviz.css"

const DataViz = (props) => {
    console.log(props)
    const canvas = useRef(null)
    useEffect(() => {
        //const data = [2, 4, 2, 6, 8]
        const data = Object.values(props.data)
        data.length && drawBarChart(data)
    }, [props.data])

    const drawBarChart = data => {
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
            .domain([0, data.length])
            .range([0, width]);

        const xAxis = d3.axisBottom(xscale);

        var xAxisGroup = svg.append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(60, 280)');
        
        svg.append('text')
            .attr("x", 225)
            .attr("y", 320)
            .text("Years")
            
        const linearScale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([0, height]);

        const scaledVals = data.map(function (item) {
            return linearScale(item);
        });

        const yscale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([height, 0]);

        const yAxis = d3.axisLeft(yscale)

        const yAxisGroup = svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(60, 30)');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -280)
            .attr('y', 15)
            .text('Annual Average Temperature (Celsius)')

        svg.selectAll('rect')
            .data(scaledVals)
            .enter()
            .append('rect')
            .attr('width', (width / data.length))
            .attr('height', function (d) {
                return d;
            })
            .attr('fill', '#04B404')
            .attr('x', function (d, i) {
                return xscale(i) + 60;
            })
            .attr('y', function (d, i) {
                return height - d + 30;
            })
            .on("mouseover", (d, i) => {
                div.transition()
                .duration(200)
                .style("opacity", 0.9)
                div.html(data[i] + "&#176;C")
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

export default DataViz

