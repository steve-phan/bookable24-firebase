require("dotenv").config()
import { Handler } from "@netlify/functions"

import { connect } from "../utils/mongooseConnect"
import { shopinfoSchema } from "../utils/models/shopInfoModel"

export const handler: Handler = async function (event) {
  const data = JSON.parse(event.body)

  const { shopName, weekdays, time } = data
  try {
    const shopnamesDb = await connect()
    const Shopinfo = shopnamesDb.model("Shopinfo", shopinfoSchema)

    await Shopinfo.findOneAndUpdate(
      { shopName },
      {
        settings: {
          weekdays,
          time,
        },
      }
    )

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
