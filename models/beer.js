//require the stuff
const mongoose = require("mongoose")
//do the stuff

//define the schema
const goodBeer = new mongoose.Schema({
  brewery: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  style: { type: String, required: true },
  abv: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true }
})
//create a model using that schema
const Beer = mongoose.model("beer", goodBeer)

//export
module.exports = Beer
