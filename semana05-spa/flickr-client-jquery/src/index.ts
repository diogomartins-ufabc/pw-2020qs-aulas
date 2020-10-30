import $ from "jquery"
import {PhotosPublic} from "./photos-public"

function loadTags(tags: string) {
    const url = new URL("http://api.flickr.com/services/feeds/photos_public.gne")

    url.searchParams.append("format", "json")
    url.searchParams.append("tags", tags)

    $.getJSON(url.toString() + "&jsoncallback=?")
        .done((photosPublic: PhotosPublic) => {
            const $container = $("main .photos")

            $container.empty()
            $("#title").append(photosPublic.title)
            $("#date").append(
                new Date(Date.parse(photosPublic.modified)).toString())
            for (const photoItem of photosPublic.items) {
                const $img = $("<img>").hide()

                $img.attr("src", photoItem.media.m)
                $container.append($img)
                $img.fadeIn(500)
            }

        })
        .fail((error) => {
            console.error("Failed to load JSON data from Flickr: " + error)
        })
        .always(() => {
            console.log("Request to Flickr finished")
        })

}

function main() {
    $("#search").on("click", () => {
        const tags = $("#tags").val()?.toString() || ""
        loadTags(tags)
    })
}

$(main)