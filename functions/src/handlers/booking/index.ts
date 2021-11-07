import { Request, Response } from "firebase-functions"

// import { db } from "../../config"

export const confirmReservation = (req: Request, res: Response) => {
  //   const data = JSON.parse(req.body)
  console.log(req.body.selectedDate)
  res.json({ message: "Hello from Firebase Functions" })
}
