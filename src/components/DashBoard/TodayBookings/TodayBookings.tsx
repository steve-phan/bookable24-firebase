import * as React from "react"
import { useAppSelector } from "src/store/hooks"
import ShowInfo from "../SharedComponent/ShowInfo"

import { getTodayBookings } from "src/utils"

const TodayBookings = () => {
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)
  return (
    <ShowInfo
      todayTermins={
        shopInfo.email !== "bookable24.de@gmail.com"
          ? getTodayBookings(allTermins)
          : allTermins
      }
    />
  )
}

export default TodayBookings
