const express = require("express")
const app = express()
const mustache = require("mustache-express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(bodyParser.urlencoded({ extended: false }))

const beerUrl = "mongodb://127.0.0.1:27017/bombBeer"
mongoose.connect(beerUrl)
const Beer = require("./models/Beer")

app.get("/", function(req, res) {
  res.render("index")
})

app.listen(3000, function() {
  console.log("Listening")
})
