import dayjs from "dayjs"
import { Request, Response } from "firebase-functions"
import { db } from "../../config"

import gaoBookings from "./gaobookings.json"

export const seedingBookings = (req: Request, res: Response) => {
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
      _id,
    } = booking || {}
    db.collection("gao-vegan0410940")
      .doc(_id.$oid)
      .set({
        status,
        selectedDate,
        selectedSlot,
        email,
        phone,
        require,
        firstName,
        lastName,
        terminAt: dayjs(booking?.selectedDate).unix() / 3600,
      })
      .then(() => {})
      .catch(() => {})
  })
}
