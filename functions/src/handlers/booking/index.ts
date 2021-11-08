export { seedingBookings } from "./seeding"
export { confirmReservation } from "./confirm"
export { cancelReservation } from "./cancel"
export { getReservation } from "./get-reservation"

const baseUrl = process.env.BASE_URL || "https://bookable24.de"

// export const confirmReservation = async (req: Request, res: Response) => {
//   //   const data = JSON.parse(req.body)
//   const { userinfo, selectedDate, selectedSlot, person, shopInfo } = req.body
//   try {
//     const bookingRef = await db.collection(shopInfo?.shopName).add({
//       ...userinfo,
//       person,
//       selectedDate,
//       selectedSlot,
//       status: false,
//       terminAt: dayjs(selectedDate).unix() / 3600,
//     })
//     const { email, firstName, lastName, phone, require } = userinfo
//     const { company, street, city, cityCode, shopName } = shopInfo
//     await db.collection("mail").add({
//       from: `${company} bookable24.de@gmail.com`,
//       replyTo: shopInfo.email,
//       to: [email, "bookable24.de@gmail.com"],
//       template: {
//         name: "confirmbooking",
//         data: {
//           name: firstName + " " + lastName,
//           person,
//           phone,
//           email,
//           require,
//           selectedDate: dayjs(selectedDate).format("MMM DD YYYY"),
//           company,
//           street,
//           city,
//           cityCode,
//           time: timeSlots[Number(selectedSlot)],
//           link_cancel: `${baseUrl}/${shopName}?bookingId=${bookingRef.id}`,
//         },
//       },
//     })

//     res.status(200).json({ message: "success" })
//   } catch (error) {
//     res.status(400).json({ message: "fail" })
//   }
// }

// export const seedingBookings = (req: Request, res: Response) => {
//   gaoBookings.map(booking => {
//     db.collection("gao-vegan0410940")
//       .doc()
//       .set({
//         ...booking,
//         terminAt: dayjs(booking?.selectedDate).unix() / 3600,
//       })
//       .then(() => {})
//       .catch(() => {})
//   })
// }
