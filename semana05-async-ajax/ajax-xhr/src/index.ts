
function loadCode(url: string) {
    // create xhr api
    const xhr = new XMLHttpRequest()

    // request success
    xhr.onload = function () {
        const preNode = document.getElementById("code-block")

        if (preNode) {
            preNode.textContent = xhr.responseText
        }
    }
    // request failure
    xhr.onerror = function () {
        console.error("Failed to load code file")
    }
    // connect
    xhr.open("GET", url)
    xhr.send()

}

window.addEventListener("load", function () {
    const links = document.getElementsByClassName("code-link")

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (ev: Event) {
            const target = ev.target as HTMLAnchorElement
            const url = target.getAttribute("data-src") || ""

            loadCode(url)
        })
    }
})