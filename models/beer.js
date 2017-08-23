//require the stuff
const mongoose = require("mongoose")
//do the stuff

//define the schema
const goodBeer = new mongoose.Schema({
  brewery: { type: String, required: true, unique: true },
  state: String,
  city: String,
  address: String,
  name: String,
  style: String,
  abv: Number
})
//create a model using that schema
const beer = mongoose.model("beer", goodBeer)

//export
module.exports = beer
