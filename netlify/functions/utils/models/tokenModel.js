const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

const tokenSchema = new Schema({
  token: String,
  expiry: String,
})

module.exports = { tokenSchema }
