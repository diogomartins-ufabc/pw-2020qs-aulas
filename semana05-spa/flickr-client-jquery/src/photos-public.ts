export interface PhotosPublic {
    "title": string,
    "link": string,
    "description": string,
    "modified": string,
    "generator": string,
    "items": [PhotoItem]
}

export interface PhotoItem {
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