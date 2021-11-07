import { Handler } from "@netlify/functions"
require("dotenv").config()

import { appointmentSchema } from "../utils/models/bookingModel"
import { ShopInfo } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopname, shopemail } = event.headers
  try {
    /**
     * @useCase : to access to multiple databases
     *
     */
    const shopNamesDb = await connect()

    // This is the global connection, so we can use Model directly
    const shopInfo = await ShopInfo.findOne({
      email: shopemail,
    })
    // Next we use useDb method to connect to another database
    const shopTerminsDb = shopNamesDb.connection.useDb(shopname)
    // Define a Model here base on the Schema
    const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)
    // Access to Model method
    const allTermins = await Appointment.find({})

    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins, shopInfo }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
