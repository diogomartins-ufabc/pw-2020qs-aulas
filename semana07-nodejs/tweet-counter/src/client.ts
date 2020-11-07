import $ from "jquery"
import {Count} from "./count"

function main() {
    let updateCounts = function (counts: Count[]) {
        $("#stats-table tbody").empty()
        console.log(counts)
        for (const count of counts) {
            const $label = $("<td>").text(count.tag)
            const $frequency = $("<td>").text(count.frequency)
            const $row = $("<tr>").append($label).append($frequency)
            $("#stats-table tbody").append($row)
        }
    };

    setInterval(function () {
        $.getJSON("http://localhost:8080/counts", updateCounts);
    }, 3000)
}

$(main)