import e from "express"
import hbs from "express-handlebars"
import path from "path"

const app = e()

// set handlebars as template engine
app.engine("handlebars", hbs({defaultLayout: "master"}))
app.set("view engine", "handlebars")
// set the default view lookup folder
app.set("views", path.resolve(__dirname, "views"))

app.get("/", (req, res) => {
    res.redirect("/saymyname/fulano/ciclano")
})

app.get("/saymyname/:fname/:lname", (req, res) => {
    res.render("index", {
        fname: req.params.fname, 
        lname: req.params.lname
    })
})

app.get("/saymyname2/:fname/:lname", (req, res) => {
    res.render("index", {
        layout: "alternate.handlebars",
        fname: req.params.fname, 
        lname: req.params.lname
    })
})

const port = parseInt(process.argv[2]) || 3000


app.listen(port, () => console.log(`Server started on port ${port}`))