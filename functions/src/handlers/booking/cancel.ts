import { Request, Response } from "firebase-functions"
import dayjs from "dayjs"
import { db } from "../../config"

import { timeSlots } from "./utils"

export const cancelReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  let message: string
  const { userinfo, selectedDate, selectedSlot, person, shopInfo, bookingId } =
    req.body
  try {
    const bookingDoc = db.doc(`${shopInfo?.shopName}/${bookingId}`)

    const bookingRef = await bookingDoc.get()
    const booking = bookingRef.data()

    if (booking?.status) {
      return res.status(200).json({ message: "not exist" })
    } else {
      await bookingDoc.update({ status: true })
      message = "success"
    }

    const { email, firstName, lastName, phone, require } = userinfo
    const { company, street, city, cityCode } = shopInfo

    await db.collection("mail").add({
      from: `Cancel Termin at ${company} bookable24.de@gmail.com`,
      replyTo: shopInfo.email,
      to: [email, "bookable24.de@gmail.com"],
      template: {
        name: "cancelbooking",
        data: {
          name: firstName + " " + lastName,
          person,
          phone,
          email,
          require,
          selectedDate: dayjs(selectedDate).format("MMM DD YYYY"),
          company,
          street,
          city,
          cityCode,
          time: timeSlots[Number(selectedSlot)],
        },
      },
    })

    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
