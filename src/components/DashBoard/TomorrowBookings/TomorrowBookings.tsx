import * as React from "react"
import { useAppSelector } from "src/store/hooks"
import { getTomorrowBookings } from "src/utils"

import ShowInfo from "../SharedComponent/ShowInfo"

const TomorrowBookings = () => {
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)
  return (
    <ShowInfo
      todayTermins={
        shopInfo.email !== "bookable24.de@gmail.com"
          ? getTomorrowBookings(allTermins)
          : allTermins
      }
    />
  )
}

export default TomorrowBookings
