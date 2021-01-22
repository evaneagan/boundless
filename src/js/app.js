import {browserData} from "./data"

// import {select, selectAll} from "d3-selection"
// import {scaleLinear, scaleSqrt, scalePow} from "d3-scale"
// import {line, curveCardinal, pie, arc} from "d3-shape"
// import {transition} from "d3-transition"
// import {easeLinear} from "d3-ease"
// import {timeFormat} from "d3-time-format"
// import {interpolate} from "d3-interpolate"

import * as d3 from "d3";



let monthIndex = 0

const colors = [
    "var(--chrome)",
    "var(--ie)",
    "var(--firefox)",
    "var(--safari)",
    "var(--opera)",
    "var(--android)"
]

const svg = d3.select("svg")

svg
    .attr("height", 640)
    .attr("widtht", 640)


const pieGroup = svg
    .append("g")
    .attr("transform", "translate(320, 320)")

const monthLabel = d3.select("div.month")





const updateGraph = function () {

    const month = new Date(2009, monthIndex, 1)
    const formattedMonth = d3.timeFormat("%b %Y")(month)
    monthLabel.text(formattedMonth)



    // console.log("update graph", data[monthIndex])
    const pieGenerator = d3.pie()
        .sort(null)
        // .startAngle(-0.5 * Math.PI)
        // .endAngle(0.5 * Math.PI)

    const arcData = pieGenerator(browserData[monthIndex])

    const arcGenerator = d3.arc()
        .innerRadius(200)
        .outerRadius(300)
        // .cornerRadius(15)

    
    const paths = pieGroup
        .selectAll("path")
        .data(arcData)
    
    // for new paths
    paths
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .style("fill", (d, i) => { return colors[i] })
        .each(function (d, i) {
            this.savedValue = d
        })

    // for existing paths
    paths
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attrTween("d", function (d, i) {67
            const startValue = this.savedValue
            const endValue = d
            const curve = d3.interpolate(startValue, endValue)


            this.savedValue = d

            return function (t) {
                return arcGenerator(curve(t))
            }
        })
}


let loop = null


const startLoop = function () {
    monthIndex = 0
    updateGraph()

    clearInterval(loop)

    loop = setInterval(function () {
        monthIndex = monthIndex + 1

        if (monthIndex >= browserData.length) {
            clearInterval(loop)
        } else {
            updateGraph()
        }

        
    }, 500)
}

startLoop()


document.querySelector('a.restart').addEventListener('click', function () {

    startLoop()

})