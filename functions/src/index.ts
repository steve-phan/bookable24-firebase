import * as functions from "firebase-functions"
import express, { Express } from "express"
import cors from "cors"

import {
  confirmReservation,
  seedingBookings,
  cancelReservation,
  getReservation,
} from "./handlers/booking"
import { shopSignUp, getShopInfo, getShopAllBookings } from "./handlers/shop"

const app: Express = express()

app.use(cors())

app.post("/all-shop-bookings", getShopAllBookings)

app.get("/seedingbookings", seedingBookings)
app.get("/shopinfo", getShopInfo)
app.post("/reservation", confirmReservation)
app.post("/get-reservation", getReservation)
app.post("/cancel-reservation", cancelReservation)
app.post("/signup", shopSignUp)
app.get("/hello", (req, res) => {
  console.log("xxxxxxx")
  res.status(200).json({ mess: "hello" })
})

export const api = functions.region("europe-west3").https.onRequest(app)

export const helloworld = functions
  .region("europe-west3")
  .https.onRequest((req, res) => {
    console.log("Hello World===>")
    res.status(200).json({ message: "Hello world" })
  })
