import * as d3 from "d3";
import "./data/areaPerformance.json";
import { doc } from "prettier";
const data = d3.json("./data/areaPerformance.json");
const width = 500;
const height = 500;

const margin = ({top: 20, right: 30, bottom: 30, left: 40});

const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d[0]))
    .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])]).nice()
    .range([height - margin.bottom, margin.top]);

const line = d3.line()
    .defined(d => !isNaN(d[1]))
    .x(d => x(d[0]))
    .y(d => y(d[1]));

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));


function chart() {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
  
     return svg.node();
  }

const viz = chart();

document.body.appendChild(viz);