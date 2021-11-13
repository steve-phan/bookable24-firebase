import { Request, Response } from "firebase-functions"
import dayjs from "dayjs"
import { db } from "../../config"
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore"

import { timeSlots } from "./utils"

export const cancelReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  let message: string = ""
  const { shopInfo, bookingId } = req.body
  console.log("shopInfo", shopInfo)
  try {
    const bookingDoc = doc(db, `${shopInfo?.shopId}`, `${bookingId}`)
    //  db.doc(`${shopInfo?.shopId}/${bookingId}`)

    const bookingRef = await getDoc(bookingDoc)
    const booking = bookingRef.data()

    if (booking?.status) {
      message = "not exist"
    } else {
      await updateDoc(bookingDoc, { status: true })
      //  bookingDoc.update({ status: true })
      message = "success"
    }

    const {
      email,
      firstName,
      lastName,
      phone,
      require,
      selectedDate,
      selectedSlot,
      person,
    } = booking || {}
    const { shopName, address } = shopInfo

    const mailRef = collection(db, "mail")
    await setDoc(doc(mailRef), {
      from: `Cancel Termin - ${shopName} bookable24.de@gmail.com`,
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
          shopName,
          address,
          time: timeSlots[Number(selectedSlot)],
        },
      },
    })
    // await db.collection("mail").add()

    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
