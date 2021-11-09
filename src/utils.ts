import dayjs from "dayjs"

import { ITermin } from "src/components/DashBoard/SharedComponent/DashBoard.types"
import { morningSlots, afternoonSlots } from "src/templates/ShopPage/utils"

export const allSlots = [...morningSlots, ...afternoonSlots]
export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
export const validatePhone = (phoneNumber: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return regex.test(phoneNumber)
}

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getShopName = (email: string, shopList: any[]): string =>
  shopList?.find(
    (shop: { email: string; shopId: string }) =>
      shop.email.toLowerCase() === email.toLowerCase()
  )?.shopId

export interface ItimeAgoMess {
  second: string
  minute: string
  halfhour: string
  hour: string
  hours: string
  day: string
  week: string
  month: string
}

export const timeAgo = (dateParam: Date, t: ItimeAgoMess) => {
  if (!dateParam) {
    return null
  }
  dayjs(dateParam).diff()
  // const date =
  //   typeof dateParam === "object"
  //     ? dateParam.getTime()
  //     : new Date(dateParam).getTime()

  // const DAY_IN_MS = 86400000
  // const today: number = new Date().getTime()
  // const yesterday = new Date(today - DAY_IN_MS)
  console.log("dateParam", dateParam)
  const seconds = dayjs().diff(dateParam, "second")
  console.log("diff", seconds)
  const minutes = Math.round(seconds / 60)
  // const isToday = today.toDateString() === date.toDateString()
  // const isYesterday = yesterday.toDateString() === date.toDateString()
  // const isThisYear = today.getFullYear() === date.getFullYear()

  switch (true) {
    case seconds < 60:
      return `${seconds}  ${t.second}`
    case seconds < 90:
      return t.minute
    case minutes < 30:
      return t.halfhour
    case minutes < 60:
      return t.hour
    case minutes / 60 < 24:
      return `${Math.round(minutes / 60)} ${t.hours}`
    case minutes / 60 / 24 < 7:
      return ` ${Math.round(minutes / 60 / 24)} ${t.day}`
    case minutes / 60 / 24 / 7 < 1:
      return `${Math.round(minutes / 60 / 24 / 7)} ${t.week}`
    default:
      return t.month
  }
}

export const filterBookings = (allTermins: ITermin[], today: string) =>
  allTermins
    .filter((termin: ITermin) => termin.selectedDate === today)
    .sort(
      (a: ITermin, b: ITermin) =>
        Number(a.selectedSlot) - Number(b.selectedSlot)
    )

export const getTodayBookings = (allTermins: ITermin[]) => {
  const today = dayjs(new Date()).format("MMM DD")
  return filterBookings(allTermins, today)
}

export const getTomorrowBookings = (allTermins: ITermin[]) => {
  let nextDay = new Date()
  nextDay.setDate(nextDay.getDate() + 1)
  const tomorrow = dayjs(nextDay).format("MMM DD")
  return filterBookings(allTermins, tomorrow)
}

/**
 *
 * @param allTermins : allTermins pass in
 * @param date : the termins of this date
 * @returns : the termins
 */

export const getDateBookings = (allTermins: ITermin[], date: Date | null) => {
  let pickedDay = date && new Date(date)
  const day = dayjs(pickedDay).format("MMM DD")
  return filterBookings(allTermins, day)
}
