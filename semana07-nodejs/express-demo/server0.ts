import e from "express"

let port = 8080
if (process.argv.length > 2) {
  const nPort = parseInt(process.argv[2])
  if (isNaN(nPort)) {
    console.error("Usage: server0.ts port")
    console.error("Starting on default port: " + port)
  } else {
    port = nPort
  }
}

const app = e();

app.listen(port, function() {
  console.log(`Listening on port ${port}. CTRL+C to shut down.`);
})

app.get('/', function(req, res) {
  res.send('Hello World!');
})

