"use strict";
function loadPhotos(photosPublic) {
    const container = document.querySelector("main .photos");
    const titleElement = document.getElementById("title");
    const dateElement = document.getElementById("date");
    while (container === null || container === void 0 ? void 0 : container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (const photoItem of photosPublic.items) {
        const imageElement = document.createElement("img");
        if (titleElement) {
            titleElement.textContent = photosPublic.title;
        }
        if (dateElement) {
            dateElement.textContent =
                new Date(Date.parse(photosPublic.modified)).toString();
        }
        imageElement.setAttribute("src", photoItem.media.m);
        container === null || container === void 0 ? void 0 : container.append(imageElement);
    }
}
/**
 * Dinamically create a <script> tag with the src attribute
 * parameterized with the url
 * @param url the string
 */
function setupJsonP(url) {
    let scriptTag = document.getElementById("flickr-jsonp");
    scriptTag === null || scriptTag === void 0 ? void 0 : scriptTag.remove();
    scriptTag = document.createElement("script");
    scriptTag.setAttribute("id", "flickr-jsonp");
    scriptTag.setAttribute("src", url);
    document.head.appendChild(scriptTag);
}
/**
 * Get the user input and build a URL with tag parameters
 */
function main() {
    var _a;
    (_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const tagsElement = document.getElementById("tags");
        const tagsText = tagsElement.value;
        const url = new URL("https://www.flickr.com/services/feeds/photos_public.gne");
        url.searchParams.append("format", "json");
        url.searchParams.append("tags", tagsText);
        url.searchParams.append("jsoncallback", "loadPhotos");
        setupJsonP(url.toString());
    });
}
window.onload = main;
