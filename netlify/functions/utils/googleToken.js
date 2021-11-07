const { google } = require("googleapis")

const { connect } = require("./mongooseConnect")
const { tokenSchema } = require("./models/tokenModel")

const getValidToken = async () => {
  let validToken = null
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  // const tokenDB = await connect("token")
  const shopNamesDb = await connect()

  /**
   * @param {TTokenData } tokenData
   */

  tokenSchema.pre("findOneAndUpdate", async function () {
    const tokenData = await this.model.find({})
    if (Number(tokenData[0].expiry) - Date.now() < 3 * 60 * 1000) {
      const {
        token,
        res: {
          data: { expiry_date },
        },
      } = await oAuth2Client.getAccessToken()
      validToken = token
      this.update({
        token: token,
        expiry: expiry_date,
      })
    } else {
      validToken = tokenData[0].token
    }
  })
  const tokenDB = shopNamesDb.connection.useDb("token")
  await tokenDB.model("token", tokenSchema).findOneAndUpdate({})

  return validToken
}

module.exports = { getValidToken }
