import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"

import { useAppSelector } from "src/store/hooks"
import { getDateBookings } from "src/utils"

import ShowInfo from "../SharedComponent/ShowInfo"
import { FlexRowSt } from "./AllBookings.css"

const AllBookingsDashBoard = () => {
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)
  const [value, setValue] = React.useState<Date | null>(new Date())
  const { t } = useTranslation()

  return (
    <div>
      <FlexRowSt>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("dashboard.helper.pickdate", "Pick a Date")}
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FlexRowSt>
      <ShowInfo
        todayTermins={
          shopInfo.email !== "bookable24.de"
            ? getDateBookings(allTermins, value)
            : allTermins
        }
      />
    </div>
  )
}
export default AllBookingsDashBoard
