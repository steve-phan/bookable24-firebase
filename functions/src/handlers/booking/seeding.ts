import dayjs from "dayjs"
import { Request, Response } from "firebase-functions"
import { db } from "../../config"

import gaoBookings from "./gao.json"

export const seedingBookings = async (req: Request, res: Response) => {
  try {
    gaoBookings.map(booking => {
      const {
        status,
        first_name: firstName,
        last_name: lastName,
        selectedDate,
        selectedSlot,
        email,
        phone,
        require,
        person,
        _id,
        created_at,
      } = booking || {}
      db.collection("gao-vegan0410940")
        .doc(_id.$oid)
        .set({
          status,
          selectedDate,
          selectedSlot,
          email,
          phone,
          person,
          require,
          firstName,
          lastName,
          terminAt: dayjs(booking?.selectedDate).unix() / 3600,
          createdAt:
            typeof created_at === "string" ? created_at : created_at.$date,
        })
    })
    res.status(200).json({ message: "success" })
  } catch (error) {
    res.status(400).json({ message: "fail" })
  }
}
