import {select, selectAll} from "d3-selection"
import {min, max, mean, sum} from "d3-array"
import {todayData} from "./data"
import {monthData} from "./data"
import {format} from "d3-format"


export default function() {

    const statsFormat = format(",.0f")

    select("p.worst-day").text(statsFormat(min(monthData)) + " steps")
    select("p.best-day").text(statsFormat(max(monthData)) + " steps")
    select("p.average-day").text(statsFormat(mean(monthData)) + " steps")
    select("p.total-28").text(statsFormat(sum(monthData)) + " steps")
    select("p.total-today").text(statsFormat(sum(todayData)) + " steps")











}