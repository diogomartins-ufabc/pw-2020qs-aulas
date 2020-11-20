import e from "express"
import * as path from "path"
import {argv} from "process"
import bodyParser from "body-parser"

const STATIC_DIR = path.join(__dirname, 'static')
const NODE_MODULES = path.join(__dirname, "node_modules")
const JQUERY = path.join(NODE_MODULES, "jquery", "dist")
const IMG_DIR = path.join(STATIC_DIR, 'img')

const port = parseInt(argv[2]) || 3000
const app = e()

// middleware to parse request bodies (when using POST method)
app.use(bodyParser.urlencoded({extended: true}))

// static middleware
app.use("/static", e.static(STATIC_DIR))
app.use("/lib/jquery", e.static(JQUERY))

// route for all HTTP methods
app.all("/", (req, res, next) => {
    res.write("<p>You made an HTTP request using any method</p>")
    next()
})

// route for HTTP GET
app.get('/', (req, res) => {
    res.write("<p>You made an HTTP request using method GET</p>")
    res.end()
})

// route for HTTP POST
app.post('/', (req, res) => {
    res.write("<p>You made an HTTP request using method POST</p>")
    res.end()
})

// route for HTTP GET
app.get('/hello', (req, res) => {
    res.send("Hello World!")
})

// route for HTTP GET with string pattern
app.get('/user+details', (req, res) => {
    res.send(req.originalUrl)
})

// route for HTTP GET with regular expression
app.get(/ufabc/, (req, res) => {
    res.send(req.originalUrl)
})

// route for HTTP GET with query string parsing
app.get('/query', (req, res) => {
    res.json(req.query)
})

// message parameterized with the query string
app.get('/saymyname', (req, res) => {
    if (Object.keys(req.query).indexOf("fname") < 0) {
        res.send("fname is a required field")
    }
    else if (Object.keys(req.query).indexOf("lname") < 0) {
        res.send("lname is a required field")
    } else {
        res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
    }
})

// message parameterized with the query string
app.post('/saymyname', (req, res) => {
    if (Object.keys(req.body).indexOf("fname") < 0) {
        res.send("fname is a required field")
    }
    else if (Object.keys(req.body).indexOf("lname") < 0) {
        res.send("lname is a required field")
    } else {
        res.send(`Hello, ${req.body.fname} ${req.body.lname}`)
    }
})

// route parameters
app.get('/name/:fname/:lname', (req, res) => {
    res.send(`<p>Hello, ${req.params.fname} ${req.params.lname}</p>`)
})
app.get('/student/:ra', (req, res) => {
    res.send(`<p>Hello, your RA is ${req.params.ra}</p>`)
})

// serving static file using req param
app.get('/users/:userid/profile-photo', (req, res) => {
    res.sendFile(path.join(IMG_DIR, `profile_photo_${req.params.userid}.jpeg`))
})

// test error middleware
app.get('/force-error', (req, res) => {
    throw Error("Failed for a random reason")
})

// error handling middleware
app.use((err: Error, req: e.Request, res: e.Response, next: e.NextFunction) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

// default route after everything fails
app.use((req, res) => {
    res.status(404).send('404! This resource does not exist in our site')
})








app.listen(port, () => console.log(`Listening on port ${port}.`))
