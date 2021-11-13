import { Request, Response } from "firebase-functions"
import {
  collection,
  query,
  getDoc,
  getDocs,
  where,
  doc,
} from "firebase/firestore"

import dayjs from "dayjs"

import { db } from "../../config"

export const getShopAllBookings = async (req: Request, res: Response) => {
  const { shopName } = req.body

  console.log("all SHOP BOOKING")
  try {
    // const shopInfo = await db.doc(`shoplist/${shopName}`).get()
    const shopInfoQuery = doc(db, "shoplist", `${shopName}`)
    const shopInfoData = (await getDoc(shopInfoQuery)).data()

    const allTerminsRef = query(collection(db, shopName))
    // await db.collection(shopName).get()
    const allTerminsDocs = await getDocs(allTerminsRef)
    let allTermins: any[] = []

    allTerminsDocs?.forEach(booking => {
      allTermins.push(booking.data())
    })

    res
      .status(200)
      .json({ type: "success", shopInfo: shopInfoData, allTermins })
  } catch (error) {
    res.status(403).json({ error, type: "faild" })
  }
}

export const getShopInfo = async (req: Request, res: Response) => {
  //@ts-ignore
  const { shopemail: shopEmail, shopname: shopName } = req.headers

  // await db.collection(shopName as string).get()
  let sN = shopName === "shop-test1234561" ? "meta-serve100009" : shopName
  console.log("trigger getallShopBooking")
  try {
    // const shopInfoQuery = query(collection(db, "shoplist", `${sN}`))
    const shopInfoRef = doc(db, "shoplist", `${sN}`)
    //  await db.doc(`shoplist/${sN}`).get()
    const shopinfo = (await getDoc(shopInfoRef)).data()
    const currentHours: number = dayjs().unix() / 3600 + dayjs().hour() - 1

    const bookingQuery = query(
      collection(db, `${sN}`),
      where("terminAt", ">=", currentHours)
    )
    // await db
    //   .collection(`${sN}`)
    //   .where("terminAt", ">=", currentHours)
    //   .get()
    const bookings: any[] = []
    const bookingRefs = await getDocs(bookingQuery)
    bookingRefs.forEach(booking => {
      const { selectedDate, selectedSlot, status } = booking.data() || {}
      bookings.push({ selectedDate, selectedSlot, status })
    })

    res.status(200).json({ messsage: "success", bookings, shopinfo })
  } catch (error) {
    console.log("err", error)
    res.status(404).json({ messsage: "fail", error })
  }
}
