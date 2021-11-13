import { Request, Response } from "firebase-functions"
import { db } from "../../config"

import { doc, getDoc } from "firebase/firestore"

export const getReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  //   let message: string
  console.log("hello world")
  const { shopName, bookingId } = req.body
  try {
    const bookingRef = doc(db, `${shopName}`, `${bookingId}`)
    // db.doc(`${shopName}/${bookingId}`)

    const bookingSnap = await getDoc(bookingRef)
    const booking = bookingSnap.data()
    let message: string
    if (booking?.status) {
      message = "not exist"
    } else {
      message = "success"
    }
    res.status(200).json({ message, booking })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
