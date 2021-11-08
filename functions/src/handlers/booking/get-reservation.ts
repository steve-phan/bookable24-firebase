import { Request, Response } from "firebase-functions"
import dayjs from "dayjs"
import { db } from "../../config"

import { timeSlots } from "./utils"

export const getReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  //   let message: string
  const { shopName, bookingId } = req.body
  try {
    const bookingDoc = db.doc(`${shopName}/${bookingId}`)

    const bookingRef = await bookingDoc.get()
    const booking = bookingRef.data()

    if (booking?.status) {
      return res.status(200).json({ message: "not exist" })
    } else {
      res.status(200).json({ message: "success", booking })
    }
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
