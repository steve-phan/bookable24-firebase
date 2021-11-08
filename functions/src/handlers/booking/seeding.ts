import dayjs from "dayjs"
import { Request, Response } from "firebase-functions"
import { db } from "../../config"

import gaoBookings from "./gaobookings.json"

export const seedingBookings = (req: Request, res: Response) => {
  gaoBookings.map(booking => {
    db.collection("gao-vegan0410940")
      .doc()
      .set({
        ...booking,
        terminAt: dayjs(booking?.selectedDate).unix() / 3600,
      })
      .then(() => {})
      .catch(() => {})
  })
}
