import { Request, Response } from "firebase-functions"
import dayjs from "dayjs"
import { db } from "../../config"

import gaoBookings from "./gaobookings.json"

export const confirmReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  const { userinfo, selectedDate, selectedSlot, person, shopInfo } = req.body
  console.log("shopInfo?.shopName", shopInfo?.shopName)
  try {
    await db.collection(shopInfo?.shopName).add({
      ...userinfo,
      person,
      selectedDate,
      selectedSlot,
      status: false,
      terminAt: dayjs(selectedDate).unix() / 3600,
    })
    res.status(200).json({ message: "success" })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}

export const seedingBookings = (req: Request, res: Response) => {
  gaoBookings.map(booking => {
    db.collection("gao-vegan0410940")
      .doc()
      .set({
        ...booking,
        terminAt: dayjs(booking?.selectedDate).unix() / 3600,
      })
      .then(() => {})
      .catch(() => {})
  })
}
