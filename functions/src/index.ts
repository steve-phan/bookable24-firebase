import * as functions from "firebase-functions"
import express, { Express } from "express"
import cors from "cors"

import { confirmReservation, seedingBookings } from "./handlers/booking"
import { shopSignUp, getShopInfo } from "./handlers/shop"

const app: Express = express()

app.use(cors({ origin: true }))

//SEEDING BOOKING
app.get("/seedingbookings", seedingBookings)

app.get("/shopinfo", getShopInfo)
app.post("/reservation", confirmReservation)
app.post("/signup", shopSignUp)

export const api = functions.region("euro-west3").https.onRequest(app)

export const helloWorld = functions
  .region("euro-west3")
  .https.onRequest((req, res) => {
    res.json("Hello Fucj uXXXX")
  })
