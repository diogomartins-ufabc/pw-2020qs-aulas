import e from "express"
import * as path from "path"
import {counts} from "./src/tweet-counter"


let port = 8080
if (process.argv.length > 2) {
  const nPort = parseInt(process.argv[2])
  if (isNaN(nPort)) {
    console.error("Usage: server.ts port")
    console.error("Starting on default port: " + port)
  } else {
    port = nPort
  }
}

const app = e();

app.use('/', e.static(path.join(__dirname, 'static')))
app.use('/dist', e.static(path.join(__dirname, 'dist')))

app.listen(port, function() {
  console.log(`Listening on port ${port}. CTRL+C to shut down.`);
})

app.get("/counts", function (req, res) {
  res.json(counts)
})

app.get('/', function (req, res) {
  res.send('This is the default route');
})

