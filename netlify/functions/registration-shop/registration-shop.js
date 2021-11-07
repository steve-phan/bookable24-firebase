require("dotenv").config()

const { shopinfoSchema } = require("../utils/config")
const { connect } = require("../utils/mongooseConnect")
const { getValidToken } = require("../utils/googleToken")

const configTransporter = require("./transporter")

const handler = async event => {
  const data = JSON.parse(event.body)
  const {
    company,
    email,
    phoneNumber,
    city,
    cityCode,
    street,
    firstName,
    lastName,
    uid,
  } = data.userinfo
  let shopName = company
    .toLowerCase()
    .split(" ")
    .filter(str => !!str)
    .join("-")

  shopName = shopName + cityCode + Math.floor(Math.random() * 100)
  try {
    const shopNamesDb = await connect()
    const ShopInfo = shopNamesDb.model("Shopinfo", shopinfoSchema)
    const newShop = new ShopInfo({
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      shopName,
    })
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      shopName,
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      token: validToken,
    })

    await newShop.save()
    await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
