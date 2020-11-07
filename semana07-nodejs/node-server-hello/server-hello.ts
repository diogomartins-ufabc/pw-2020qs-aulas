import * as http from "http"

if (process.argv.length < 3) {
    console.error("Usage: server.ts port")
    process.exit(1)
}

const port = parseInt(process.argv[2]) || 8080

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type": "text/plain"
    })
    res.end("Hello World!")
})

server.listen(port)

console.log(`Server running on port ${port}. Press CTRL+c to shut down.`)