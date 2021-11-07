import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import React, { useState } from "react"
import axios from "axios"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSetingsDisableDays } from "src/store/shop/shopSlice"

import HourSelect from "./HourSelect"
import {
  DaySt,
  SubmitButtonSt,
  TitleSt,
  WrapDaySt,
  WrapHourSt,
} from "./Settings.css"
import { updateList } from "./utils"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const SettingsDashBoard = () => {
  const [check, setCheck] = useState(false)
  const [list, setList] = useState<number[]>([])
  const dispatch = useAppDispatch()
  const { shopInfo } = useAppSelector(state => state?.shop)
  const { shopName } = shopInfo
  const { weekdays = [], time = "12:30" } = shopInfo?.settings || {}
  const handleSubmitDisable = async () => {
    const res = await axios.post(
      "/.netlify/functions/admin-setting-booking",
      JSON.stringify({
        shopName,
        weekdays,
        time,
      })
    )
    if (res.data === "EMAIL_SENT") {
      alert("Setting Success")
    }
  }
  return (
    <div>
      <TitleSt>Setting Disable</TitleSt>
      <Grid container>
        <Grid item xs={12} md={4}>
          <WrapHourSt>
            <p>Select the time to disable booking</p>
            <HourSelect />
          </WrapHourSt>
        </Grid>
        <Grid item xs={12} md={8}>
          <WrapDaySt>
            {week.map((day, index) => {
              return (
                <DaySt key={day + index}>
                  <Checkbox
                    id={day + index}
                    {...label}
                    value={index}
                    onChange={() => {
                      if (weekdays?.includes(index)) {
                        dispatch(
                          setSetingsDisableDays(updateList(weekdays, index))
                        )
                      } else {
                        dispatch(setSetingsDisableDays([...weekdays, index]))
                      }
                    }}
                    checked={weekdays?.includes(index)}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={day + index}>
                    {day}
                  </label>
                </DaySt>
              )
            })}
          </WrapDaySt>
        </Grid>
      </Grid>
      <SubmitButtonSt onClick={handleSubmitDisable}>
        Update Settings
      </SubmitButtonSt>
    </div>
  )
}

export default SettingsDashBoard
