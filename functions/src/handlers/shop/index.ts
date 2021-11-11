import { Request, Response } from "firebase-functions"

import dayjs from "dayjs"

import { db } from "../../config"
import { TshopInfo } from "./shop.types"
import { createShopName } from "./utils"
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

export { getShopAllBookings } from "./get-all-shop-bookings"
export const shopSignUp = async (req: Request, res: Response) => {
  const {
    company,
    email,
    phoneNumber,
    city,
    cityCode,
    street,
    firstName,
    lastName,
    uid,
  }: TshopInfo = req.body

  const shopName = createShopName(company, cityCode)

  try {
    await db.doc(`shoplist/${shopName}`).set({
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      shopName,
      isActive: false,
      createAt: dayjs().format("MMM DD YYYY"),
    })

    await db.collection("mail").add({
      from: "Bookable24 bookable24.de@gmail.com`",
      replyTo: "bookable24.de@gmail.com",
      to: [email, "bookable24.de@gmail.com"],
      template: {
        name: "shopsignup",
        data: {
          phoneNumber,
          email,
          company,
          street,
          city,
          cityCode,
          link_shop: `${baseUrl}/${shopName}`,
        },
      },
    })
    res.status(200).json({ type: "success" })
  } catch (error) {
    res.status(403).json({ message: error, type: "faild" })
  }
}

export const getShopInfo = async (req: Request, res: Response) => {
  //@ts-ignore
  const { shopemail: shopEmail, shopname: shopName } = req.headers

  // await db.collection(shopName as string).get()
  // let sN = shopName === "shop-test1234561" ? "meta-serve100009" : shopName

  try {
    const shopInfoRef = await db
      .collection("shoplist")
      .where("email", "==", shopEmail)
      .get()
    let shopinfo: any
    shopInfoRef.forEach(data => (shopinfo = data.data()))
    console.log("shopinfo", shopinfo)
    const currentHours: number = dayjs().unix() / 3600 + dayjs().hour() - 1

    const bookingRef = await db
      .collection(`${shopInfoRef}`)
      .where("terminAt", ">=", currentHours)
      .get()
    const bookings: any[] = []
    bookingRef.forEach(booking => {
      const { selectedDate, selectedSlot, status } = booking.data() || {}
      bookings.push({ selectedDate, selectedSlot, status })
    })

    res.status(200).json({ messsage: "success", bookings, shopinfo })
  } catch (error) {
    console.log("err", error)
    res.status(404).json({ messsage: "fail", error })
  }
}
