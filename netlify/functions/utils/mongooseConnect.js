const mongoose = require("mongoose")

const { getUrl } = require("./utils.ts")

/**
 * @type { Promise<typeof import("mongoose")> } conn
 */

let conn = null

// const uri = 'YOUR CONNECTION STRING HERE';

const connect = async function () {
  let url = getUrl("shopnames")

  if (conn == null) {
    conn = mongoose
      .connect(url, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose)
    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn
  }
  return conn
}

module.exports = { connect }
