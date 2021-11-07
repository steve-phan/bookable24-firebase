import { Request, Response } from "firebase-functions"
import dayjs from "dayjs"

import { db } from "../../config"
import { TshopInfo } from "./shop.types"
import { createShopName } from "./utils"

export const shopSignUp = (req: Request, res: Response) => {
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

  db.doc(`shoplist/${shopName}`)
    .set({
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
    .then(data => {
      res.status(200).json({ type: "success" })
    })
    .catch(err => {
      res.status(403).json({ message: err, type: "faild" })
    })
}

export const getShopInfo = async (req: Request, res: Response) => {
  console.log(req.headers)

  const { shopemail: shopEmail, shopname: shopName } = req.headers

  try {
    const shopInfo = await db.doc(`shoplist/${shopName}`).get()
  } catch (error) {}

  db.collection(shopName as string).get

  res.status(200).json({ messsage: "test" })
}
