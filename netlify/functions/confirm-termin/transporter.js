require("dotenv").config()
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")
const { timeSlots } = require("../utils/models/timeslot")
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

const configTransporter = ({
  shopName,
  token,
  email,
  phone,
  person,
  lastName,
  firstName,
  selectedSlot,
  selectedDate,
  terminId,
  require,
  shopInfo,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      accessToken: token,
    },
  })
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.join(__dirname, "views"),
        layoutsDir: path.join(__dirname, "views/layouts"),
      },
      viewPath: path.join(__dirname, "views"),
      extName: ".hbs",
    })
  )
  const { company, street, city, cityCode } = shopInfo

  let mailOptions = {
    from: `${company.toUpperCase()}  <${shopInfo.email}>`,
    to: [email, shopInfo.email, "lebenistcode@gmail.com"],
    subject: `Dein Termin - ${company}`,
    template: "termin",
    context: {
      name: firstName + " " + lastName,
      person,
      phone,
      email,
      require,
      selectedDate,
      company,
      street,
      city,
      cityCode,
      time: timeSlots[Number(selectedSlot)],
      link_cancel: `${baseUrl}/${shopName}?bookingId=${terminId}`,
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

module.exports = configTransporter
