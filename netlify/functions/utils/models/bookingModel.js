const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

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

module.exports = { appointmentSchema }

// export const Appointment = mongoose.model("Appointment", appointmentSchema)
