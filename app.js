const express = require("express")
const app = express()
const mustache = require("mustache-express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("./public"))

const beerUrl = "mongodb://127.0.0.1:27017/bombBeer"
mongoose.connect(beerUrl)
const Beer = require("./models/beer")

app.get("/", function(req, res) {
  Beer.find().then(function(beer) {
    res.render("index", {
      beer: beer
    })
  })
})

app.get("/beer/new", function(req, res) {
  res.render("addBeer")
})

app.post("/app", function(req, res) {
  const brewery = req.body.brewery
  const name = req.body.name
  const style = req.body.style
  const abv = req.body.abv
  const state = req.body.state
  const city = req.body.city

  const beer = new Beer()
  beer.brewery = brewery
  beer.name = name
  beer.style = style
  beer.abv = abv
  beer.state = state
  beer.city = city
  beer
    .save()
    .then(function(beer) {
      console.log("success")
      res.redirect("/")
    })
    .catch(function(error) {
      console.log(error)
      res.render("addBeer", {
        beer: beer,
        error: error.errors
      })
    })
})

app.post("/app/:id/", function(req, res) {
  Beer.findOne({ _id: req.params.id }).then(function(beer) {
    const brewery = req.body.brewery
    const name = req.body.name
    const style = req.body.style
    const abv = req.body.abv
    const state = req.body.state
    const city = req.body.city

    beer.brewery = brewery
    beer.name = name
    beer.style = style
    beer.abv = abv
    beer.state = state
    beer.city = city
    beer
      .save()
      .then(function(beer) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          beer: beer,
          error: error.errors
        })
      })
  })
})

app.get("/app/:id", function(req, res) {
  Beer.findOne({ _id: req.params.id }).then(function(beer) {
    res.render("detail", {
      beer: beer
    })
  })
})

app.get("/app/:id/edit", function(req, res) {
  Beer.findOne({ _id: req.params.id }).then(function(beer) {
    res.render("edit", {
      beer: beer
    })
  })
})

app.get("/app/:id/delete", function(req, res) {
  Beer.deleteOne({ _id: req.params.id }).then(function() {
    res.redirect("/")
  })
})

app.listen(3000, function() {
  console.log("Listening")
})
