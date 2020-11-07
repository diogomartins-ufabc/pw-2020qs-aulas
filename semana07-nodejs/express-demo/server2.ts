import e from "express"
import * as path from "path"

let port = 8080
if (process.argv.length > 2) {
  const nPort = parseInt(process.argv[2])
  if (isNaN(nPort)) {
    console.error("Usage: server1.ts port")
    console.error("Starting on default port: " + port)
  } else {
    port = nPort
  }
}

const app = e();

app.use('/', e.static(path.join(__dirname, 'static')))

app.listen(port, function() {
  console.log(`Listening on port ${port}. CTRL+C to shut down.`);
})

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('/goodbye', function (req, res) {
    res.send('Goodbye World!');
});

app.get('/', function (req, res) {
    res.send('This is the default route');
});

