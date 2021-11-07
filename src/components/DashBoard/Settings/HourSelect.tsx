import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setSettingDisableTime,
  setSetingsDisableDays,
} from "src/store/shop/shopSlice"
import { allSlots } from "src/templates/ShopPage/utils"

import {
  WrapDaySt,
  WrapHourSt,
  DaySt,
  TitleSt,
  SubmitButtonSt,
} from "./Settings.css"

const HourSelect = () => {
  const dispatch = useAppDispatch()

  const { weekdays = [], time = "12:30" } = useAppSelector(
    state => state?.shop?.settings
  )

  const menuItems = () =>
    allSlots.map((h, i) => (
      <MenuItem key={Math.random() + i + Math.random()} value={h}>
        {h}
      </MenuItem>
    ))
  return (
    <FormControl variant="standard" sx={{ minWidth: 80 }} fullWidth>
      <InputLabel id="select-guest-number-label">Hours</InputLabel>
      <Select
        labelId="select-guest-number-label"
        value={time}
        label="Personen"
        onChange={(event: SelectChangeEvent) => {
          dispatch(setSettingDisableTime(event.target.value as string))
          // dispatch(setNumberOfGuest(Number(event.target.value as string)))
        }}
      >
        {menuItems()}
      </Select>
    </FormControl>
  )
}
export default HourSelect
