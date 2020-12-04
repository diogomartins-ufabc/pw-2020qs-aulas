import e from "express"
import * as path from "path"
import * as todo from "./todo"
import bodyParser from "body-parser"
import { config } from "./config"
import hbs from "express-handlebars"

const STATIC_DIR = path.join(__dirname, '..', 'static')

const app = e()

/**
 * set up handlebars as view engine
 */
app.engine("handlebars", hbs({
    helpers: {
        equals: (a: string, b: string) => a == b
    }
}))
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "..", "views"))

/**
 * Configure body parser middleware
 */
app.use(bodyParser.urlencoded({extended: true}))

/**
 * static routes
 */
app.use('/static', e.static(STATIC_DIR))

/**
 * Dynamic routes
 */
app.get("/", (req, res) => {
    res.redirect("/newest")
})

app.get("/newest", (req, res) => {
    res.render("newest", {
        todos: todo.formatToDos()
    })
})

app.get("/oldest", (req, res) => {
    res.render("oldest", {
        todos: todo.formatToDos().reverse()
    })
})

app.get("/tags", (req, res) => {
    // TODO: implement tags rendering
    res.render("tags", {message: "TODO: implement as an exercise"})
})

app.get("/add", (req, res) => {
    res.render("add")
})

app.post("/add", (req, res) => {
    const isValid = () => 
        "description" in req.body
        && "tags" in req.body
        && req.body.description.trim().length > 0
        && req.body.tags.trim().length > 0
    
    const nextId = () => (todo.model.length > 0) 
        ? todo.model[todo.model.length - 1].id + 1 
        : 1

    if (isValid()) {
        const newToDo: todo.ToDo = {
            id: nextId(),
            description: req.body.description,
            tags: req.body.tags.split(",")
                .map((tag: string) => tag.trim())
                .filter((tag: string) => tag.length > 0)
        }

        todo.model.push(newToDo)
        res.render("status", {status: "success_add"})
    } else {
        res.render("status", {status: "failed_add"})
    }
})


/**
 * OS signal handling
 * Automatic saving of the data model to disk
 * when the server shuts down
 */
process.once('exit', (code) => {
    console.log(`Server exiting with code ${code}...`)
    todo.saveFile()
    console.log(`Server exited`)
})

function exitHandler() {
    process.exit()
}

process.once("SIGINT", exitHandler)
process.once("SIGUSR2", exitHandler)


app.listen(config["server-port"], () => {
    todo.loadFile()
    console.log("ToDo! server Listening on port " + config["server-port"])
})