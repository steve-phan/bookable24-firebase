import dayjs from "dayjs"
import { Request, Response } from "firebase-functions"

import { db } from "../../config"
import { timeSlots } from "./utils"
import { doc, collection, setDoc } from "firebase/firestore"

const baseUrl = process.env.BASE_URL || "https://bookable24.de"

export const confirmReservation = async (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  const { userinfo, selectedDate, selectedSlot, person, shopInfo } = req.body
  try {
    const bookingRef = collection(db, shopInfo?.shopName)
    await setDoc(doc(bookingRef), {
      ...userinfo,
      person,
      selectedDate,
      selectedSlot,
      status: false,
      terminAt: dayjs(selectedDate).unix() / 3600,
      createdAt: new Date().toISOString(),
    })
    // const bookingRef = await db.collection(shopInfo?.shopName).add()
    const { email, firstName, lastName, phone, require } = userinfo
    const { company, street, city, cityCode, shopName } = shopInfo

    const mailRef = collection(db, "mail")
    await setDoc(doc(mailRef), {
      from: `${company} bookable24.de@gmail.com`,
      replyTo: shopInfo.email,
      to: [email, "bookable24.de@gmail.com"],
      template: {
        name: "confirmbooking",
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
          link_cancel: `${baseUrl}/${shopName}?bookingId=${bookingRef.id}`,
        },
      },
    })
    // await db.collection("mail").add()

    res.status(200).json({ message: "success" })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
