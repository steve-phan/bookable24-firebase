require("dotenv").config()
// const nodemailer = require('nodemailer');
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

const configTransporter = ({
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
  token,
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

  let mailOptions = {
    from: "BookAble24 <vietappeu@gmail.com>",
    to: [email, "lebenistcode@gmail.com", "bookable24.de@gmail.com"],
    subject: "Your Shop Booking System Request",
    template: "account",
    context: {
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
      link_shop: `${baseUrl}/${shopName}`,
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter
