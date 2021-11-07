import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, getDefaultSlot, morningSlots } from "../utils"
import { CardSt } from "./StepComponents.css"

const PrewView = () => {
  const {
    selectedDate,
    selectedSlot = getDefaultSlot(),
    guestInfo,
    numberOfGuest,
  } = useAppSelector(state => state.booking)

  return (
    <WrapColSt>
      <CardSt style={{ border: "none", boxShadow: "none" }}>
        <Typography>{/* {shopinfo.company} */}</Typography>
        <Typography>
          {/* {shopinfo.street + " " + shopinfo.city + " " + shopinfo.cityCode} */}
        </Typography>
      </CardSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:{" "}
          {[...morningSlots, ...afternoonSlots][selectedSlot] +
            " " +
            dayjs(selectedDate).format("dddd, DD. MMMM")}
        </Typography>

        <Typography>Persons: {numberOfGuest}</Typography>
        <Typography>Require: {guestInfo.require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>

        <Typography>
          Name: {guestInfo.lastName + " " + guestInfo.firstName}
        </Typography>
        <Typography>Email: {guestInfo.email}</Typography>
        <Typography>Phone: {guestInfo.phone}</Typography>
      </CardSt>
    </WrapColSt>
  )
}

export default PrewView
