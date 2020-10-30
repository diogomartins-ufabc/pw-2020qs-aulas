"use strict";
function loadPhotos(photosPublic) {
    window.addEventListener("load", function () {
        const container = document.querySelector("main .photos");
        const titleElement = document.getElementById("title");
        const dateElement = document.getElementById("date");
        for (const photoItem of photosPublic.items) {
            const imageElement = document.createElement("img");
            if (titleElement) {
                titleElement.textContent = photosPublic.title;
            }
            if (dateElement) {
                dateElement.textContent = photosPublic.modified;
            }
            imageElement.setAttribute("src", photoItem.media.m);
            container === null || container === void 0 ? void 0 : container.append(imageElement);
        }
    });
}
