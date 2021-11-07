const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

const slotSchema = new Schema({
  slot_time: String,
  slot_date: String,
  created_at: Date,
})
const appointmentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  selectedSlot: String,
  selectedDate: String,
  person: String,
  require: String,
  created_at: {
    default: new Date(),
    type: Date,
  },
  status: {
    default: false,
    type: Boolean,
  },
})

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
  shopname: String,
})

const tokenSchema = new Schema({
  token: String,
  expiry: String,
})
const requestSchema = new Schema({
  email: String,
  phone: String,
})

const Token = mongoose.model("Token", tokenSchema)
const Slot = mongoose.model("Slot", slotSchema)
const Appointment = mongoose.model("Appointment", appointmentSchema)
const ShopInfo = mongoose.model("Shopinfo", shopinfoSchema)
const RequestInfo = mongoose.model("RequestInfo", requestSchema)

module.exports = {
  shopinfoSchema,
  tokenSchema,
  Token,
  Slot,
  Appointment,
  ShopInfo,
  RequestInfo,
}
