"use strict";

const main = () => {
    $('form').on('submit', (ev) => {
        const $fname = $("#fname")
        const $lname = $("#lname")

        const reqData = {
            fname: $fname.val(),
            lname: $lname.val()
        }

        $.post($('form').attr('action'), reqData, (resp) => {
            $("#message-area").html(resp)
        })
        ev.preventDefault()
    });
}

$(main)