require("dotenv").config()
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")

const configTransporter = ({ token, email, lastName, firstName, shopInfo }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "lebenistcode@gmail.com",
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
  const { shopName, address } = shopInfo
  const mailOptions = {
    from: `${shopName}  <${shopInfo.email}>`,
    to: [email, shopInfo.email, "lebenistcode@gmail.com"],
    subject: `Cancel Booking at ${shopName}`,
    template: "cancel",
    context: {
      name: firstName + " " + lastName,
      address,
      shopName,
    },
  }

  return {
    transporter,
    mailOptions,
  }
}

module.exports = configTransporter
