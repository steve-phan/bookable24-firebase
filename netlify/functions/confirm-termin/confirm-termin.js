require("dotenv").config()
const dayjs = require("dayjs")

const { connect } = require("../utils/mongooseConnect")
const { appointmentSchema } = require("../utils/models/bookingModel")
const configTransporter = require("./transporter")
const { getValidToken } = require("../utils/googleToken")

const handler = async function (event) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }

  const appointment = JSON.parse(event.body)
  const {
    userinfo: { firstName, lastName, email, phone },
    selectedDate,
    selectedSlot,
    person,
    require,
    shopInfo,
  } = appointment
  const shopName = Boolean(shopInfo.shopName)
    ? shopInfo.shopName
    : shopInfo.shopname
  const formatDate = dayjs(
    selectedDate,
    selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  ).format("MMM DD YYYY")
  try {
    const shopnamesDb = await connect()

    const bookingConn = shopnamesDb.connection.useDb(shopName)

    const Appointment = bookingConn.model("Appointment", appointmentSchema)

    const newappointment = new Appointment({
      first_name: firstName,
      last_name: lastName,
      selectedSlot,
      selectedDate: formatDate,
      email,
      phone,
      person,
      require,
    })

    await newappointment.save()
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      shopName,
      token: validToken,
      email,
      person,
      phone,
      lastName,
      firstName,
      selectedSlot,
      selectedDate: formatDate,
      require,
      shopInfo,
      terminId: newappointment._id,
    })

    await transporter.sendMail(mailOptions)
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

module.exports = { handler }
