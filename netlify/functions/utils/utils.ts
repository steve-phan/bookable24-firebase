/**
 *
 * @param {string} dbName
 * @returns {string}
 */

const getUrl = dbName =>
  `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${dbName}?retryWrites=true&w=majority`

module.exports = { getUrl }
