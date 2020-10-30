interface PhotosPublic {
    "title": string,
    "link": string,
    "description": string,
    "modified": string,
    "generator": string,
    "items": [PhotoItem]
}

interface PhotoItem {
    "title": string,
    "link": string,
    "media": {
        "m": string
    },
    "date_taken": string,
    "description": string,
    "published": string,
    "author": string,
    "author_id": string,
    "tags": string
}

function loadPhotos(photosPublic: PhotosPublic): void {
    window.addEventListener("load", function () {
        const container = document.querySelector("main .photos")
        const titleElement = document.getElementById("title")
        const dateElement = document.getElementById("date")
        
        for (const photoItem of photosPublic.items) {
            const imageElement = document.createElement("img")
            
            if (titleElement) {
                titleElement.textContent = photosPublic.title
            }
            if (dateElement) {
                dateElement.textContent = photosPublic.modified
            }
            

            imageElement.setAttribute("src", photoItem.media.m)
            container?.append(imageElement)
        }
    })
}