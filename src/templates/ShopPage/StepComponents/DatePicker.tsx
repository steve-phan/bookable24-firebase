import * as React from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedDate, setNumberOfGuest } from "src/store/shop/bookingSlice"

import { WrapRowSt } from "../ShopPage.css"
import { checkDisableDate } from "../utils"

const SelectDatePicker = () => {
  const dispatch = useAppDispatch()
  const { numberOfGuest, selectedDate } = useAppSelector(state => state.booking)

  const PersonSelect = ({ numberOfGuest }: { numberOfGuest: number }) => {
    const menuItems = () =>
      [...Array(10)].map((_, i) => (
        <MenuItem key={Math.random() + i + Math.random()} value={i + 1}>
          {i + 1}{" "}
        </MenuItem>
      ))
    return (
      <Box>
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="select-guest-number-label">Personen</InputLabel>
          <Select
            style={{ paddingLeft: 16 }}
            labelId="select-guest-number-label"
            value={`${numberOfGuest}`}
            label="Personen"
            onChange={(event: SelectChangeEvent) => {
              dispatch(setNumberOfGuest(Number(event.target.value as string)))
            }}
          >
            {menuItems()}
          </Select>
        </FormControl>
      </Box>
    )
  }

  return (
    <WrapRowSt>
      <PersonSelect numberOfGuest={numberOfGuest} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          shouldDisableDate={checkDisableDate}
          label="Datum"
          inputFormat="MMM-dd-yyyy"
          value={selectedDate}
          onChange={newValue => {
            dispatch(setSelectedDate(newValue))
          }}
          renderInput={params => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
    </WrapRowSt>
  )
}

export default SelectDatePicker
