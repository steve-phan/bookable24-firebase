import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import axios from "axios"

import { IshopInfo } from "src/store/shop/shop.types"

import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, morningSlots } from "../utils"
import { CardSt } from "../StepComponents/StepComponents.css"
import { CanCelButtonSt } from "../ShopPage.css"

const CancelBooking = ({
  booking,
  shopName,
  shopInfo,
  location,
}: {
  booking: any
  shopName: string
  shopInfo: IshopInfo
  location: any
}) => {
  const { navigate } = useI18next()
  const {
    selectedDate,
    selectedSlot,
    guestInfo,
    last_name,
    first_name,
    require,
    person,
    email,
    phone,
    status,
  } = booking

  const handleCancelBooking = () => {
    const bookingId = location.search.replace("?", "").split("=")[1]
    axios
      .get("/.netlify/functions/cancel-termin", {
        headers: {
          shopName,
          bookingId,
          shopInfo: JSON.stringify(shopInfo),
        },
      })
      .then(res => {
        alert("Cancel success. Thanks")
        navigate("/")
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  if (status) {
    return <p>This reservation is not exist</p>
  }

  return (
    <WrapColSt>
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

        <Typography>Persons: {person}</Typography>
        <Typography>Require: {require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>
        <Typography>Name: {last_name + " " + first_name}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardSt>

      <CanCelButtonSt
        style={{
          color: "white",
        }}
        onClick={handleCancelBooking}
      >
        Cancel Booking?
      </CanCelButtonSt>
    </WrapColSt>
  )
}

export default CancelBooking
