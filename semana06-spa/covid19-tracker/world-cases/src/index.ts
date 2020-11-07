import $ from "jquery"
import {Summary} from "./summary"

function loadData(summary: Summary) {
    const fmt = (n: number) => n.toLocaleString("en-US")

    $("#confirmed").text(fmt(summary.Global.TotalConfirmed))
    $("#new-confirmed").text(fmt(summary.Global.NewConfirmed))
    $("#deaths").text(fmt(summary.Global.TotalDeaths))
    $("#new-deaths").text(fmt(summary.Global.NewDeaths))
    $("#recovered").text(fmt(summary.Global.TotalRecovered))
    $("#new-recovered").text(fmt(summary.Global.NewRecovered))

    let mostRecentDate: Date = new Date("01/01/1970")

    for (const country of summary.Countries) {
        const date = new Date(Date.parse(country.Date))

        if (date > mostRecentDate) {
            mostRecentDate = date
        }
    }

    $("#last-updated").text(mostRecentDate.toString())
}

function main() {
    $.getJSON("https://api.covid19api.com/summary")
        .done(loadData)
        .fail(error => 
            console.error("Failed to load data from API: " + error))
}

$(main)
