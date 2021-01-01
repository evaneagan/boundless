import {select, selectAll} from "d3-selection"
import {scaleLinear} from "d3-scale"
import {min, max} from "d3-array"
import {todayData} from "./data"
import {easePolyInOut, easePoly} from "d3-ease"
import {transition} from "d3-transition"
import {format} from "d3-format"

export default function () {

let barHeight = 112
let maxSteps = max(todayData)

const todaySvg = select("svg.today")
const barScale = scaleLinear()
    .domain([0, maxSteps])
    .range([1, barHeight])


const todayGroups = todaySvg
    .selectAll("g")
    .data(todayData)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {return "translate(" + (i * 36) + ", 20)"} )

const hourFormat = format("02")

todayGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", barHeight)
    .attr("class", "transparent")


todayGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => {return barHeight})
    .attr("width", 20)
    .attr("height", 1)
    .transition()
        .duration(800)
        .delay((d, i) => {return i * 20 + 100})
        .ease( easePoly.exponent(5) )
    .attr("height", (d, i) => { return barScale(d) })
    .attr("y", (d, i) => {return barHeight - barScale(d) })


todayGroups
    .append("text")
    .attr("x", 10)
    .attr("y", barHeight + 20)
    .attr("class", "today-hours")
    .text((d, i) => {return hourFormat(0)})
    .transition()
        .duration(800)
        .delay((d, i) => {return i * 20 + 500})
        .ease( easePoly.exponent(1) )
    .text((d, i) => {return hourFormat(i)})

todayGroups
    .append("text")
    .attr("x", 10)
    .attr("y", (d, i) => {return 112 - barScale(d) - 10})
    .attr("class", "today-steps")
    .text((d, i) => {return ""})
    .transition()
        .duration(800)
        .delay((d, i) => {return i * 20 + 500})
        .ease( easePoly.exponent(1) )
    .text((d, i) => {return d})



}


