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
    const container = document.querySelector("main .photos")
    const titleElement = document.getElementById("title")
    const dateElement = document.getElementById("date")
    
    while (container?.firstChild) {
        container.removeChild(container.firstChild)
    }
    for (const photoItem of photosPublic.items) {
        const imageElement = document.createElement("img")
        
        if (titleElement) {
            titleElement.textContent = photosPublic.title
        }
        if (dateElement) {
            dateElement.textContent = 
                new Date(Date.parse(photosPublic.modified)).toString()
        }

        imageElement.setAttribute("src", photoItem.media.m)
        container?.append(imageElement)
    }
}

/**
 * Dinamically create a <script> tag with the src attribute 
 * parameterized with the url
 * @param url the string
 */
function setupJsonP(url: string): void {
    let scriptTag = document.getElementById("flickr-jsonp")

    scriptTag?.remove()
    scriptTag = document.createElement("script")
    scriptTag.setAttribute("id", "flickr-jsonp")
    scriptTag.setAttribute("src", url)
    document.head.appendChild(scriptTag)
}

/**
 * Get the user input and build a URL with tag parameters
 */
function main() {
    document.getElementById("search")?.addEventListener("click", () => {
        const tagsElement = document.getElementById("tags") as HTMLInputElement
        const tagsText = tagsElement.value

        const url = new URL("https://www.flickr.com/services/feeds/photos_public.gne")

        url.searchParams.append("format", "json")
        url.searchParams.append("tags", tagsText)
        url.searchParams.append("jsoncallback", "loadPhotos")

        setupJsonP(url.toString())
    })
}

window.onload = main