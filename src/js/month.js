import {select, selectAll} from "d3-selection"
import {scaleLinear, scaleSqrt} from "d3-scale"
import {min, max} from "d3-array"
import {monthData} from "./data"
import {easePolyInOut, easePoly} from "d3-ease"

export default function() {

    const maxCircleRadius = 40
    const monthSvg = select("svg.month")
    const maxMonthData = max(monthData)

    const radiusScale = scaleSqrt()
        .domain([0, max(monthData)])
        .range([0, maxCircleRadius])


    const colorScale = scaleSqrt()
        .domain([0, (max(monthData)/2), max(monthData)])
        .range([ "#E6FB04", "#FF0099", "#00FF66" ])



    const monthGroups = monthSvg
        .selectAll("g")
        .data(monthData)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            const x = (i % 7) * 120 + 60
            const y = (Math.floor( i / 7 )) * 150 + 60

            return `translate(${x}, ${y})`})
    

monthGroups
        .append("circle")
        .attr("r", maxCircleRadius)
        .attr("fill", (d, i) => { return colorScale(d)})
        .attr("class", "transparent")


monthGroups
        .append("circle")
        .attr("r", radiusScale(maxMonthData))
        .attr("class", "ring")

monthGroups
        .append("circle")
        .attr("r", radiusScale(maxMonthData / 2))
        .attr("class", "ring")






monthGroups
        .append("circle")
        .attr("r", 6)
        .attr("fill", (d, i) => { return colorScale(d)})
        .transition()
        .duration(800)
        .delay((d, i) => {return i * 20 + 100})
        .ease( easePoly.exponent(5) )
        .attr("r", (d, i) => {return radiusScale(d)})
        .attr("class", "data-circle")

monthGroups
        .append("text")
        .attr("x", 0)
        .attr("y", maxCircleRadius + 20)
        .attr("class", "month-days")
        .text((d, i) => {return ""})
        .transition()
            .duration(800)
            .delay((d, i) => {return i * 20 + 500})
            .ease( easePoly.exponent(1) )
        .text((d, i) => {return i + 1})

monthGroups
        .append("text")
        .attr("x", 0)
        .attr("y", maxCircleRadius + 20)
        .attr("class", "month-steps")
        .text((d, i) => {return ""})
        .transition()
            .duration(800)
            .delay((d, i) => {return i * 20 + 500})
            .ease( easePoly.exponent(1) )
        .text((d, i) => {return d})
        


}