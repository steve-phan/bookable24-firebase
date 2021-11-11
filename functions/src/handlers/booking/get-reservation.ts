import { Request, Response } from "firebase-functions"
import { db } from "../../config"

export const getReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  //   let message: string
  const { shopName, bookingId } = req.body
  try {
    const bookingDoc = db.doc(`${shopName}/${bookingId}`)

    const bookingRef = await bookingDoc.get()
    const booking = bookingRef.data()
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
