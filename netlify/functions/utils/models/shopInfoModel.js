const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

const shopinfoSchema = new Schema({
  company: String,
  email: String,
  password: String,
  phoneNumber: String,
  city: String,
  cityCode: String,
  street: String,
  firstName: String,
  lastName: String,
  uid: String,
  shopName: String,
  settings: {},
})

const ShopInfo = mongoose.model("Shopinfo", shopinfoSchema)

module.exports = { shopinfoSchema, ShopInfo }
