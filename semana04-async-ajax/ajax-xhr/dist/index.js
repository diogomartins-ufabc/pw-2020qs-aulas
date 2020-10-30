"use strict";
function loadCode(url) {
    // create xhr api
    var xhr = new XMLHttpRequest();
    // request success
    xhr.onload = function () {
        var preNode = document.getElementById("code-block");
        if (preNode) {
            preNode.textContent = xhr.responseText;
        }
    };
    // request failure
    xhr.onerror = function () {
        console.error("Failed to load code file");
    };
    // connect
    xhr.open("GET", url);
    xhr.send();
}
window.addEventListener("load", function () {
    var links = document.getElementsByClassName("code-link");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (ev) {
            var target = ev.target;
            var url = target.getAttribute("data-src") || "";
            loadCode(url);
        });
    }
});
