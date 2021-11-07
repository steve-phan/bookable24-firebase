import dayjs from "dayjs"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedSlot } from "src/store/shop/bookingSlice"
import { getDateBookings } from "src/utils"
import { ITermin } from "src/components/DashBoard/SharedComponent/DashBoard.types"

import {
  afternoonSlots,
  morningSlots,
  getDefaultSlot,
  allSlots,
} from "../utils"
import {
  ButtonGroupSt,
  ButtonSlotSt,
  TitleBannerSt,
} from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"

const isWeekend = (date: Date | null) =>
  dayjs(date).day() === 6 || dayjs(date).day() === 0

const reduceTermins = (arr: ITermin[]) =>
  arr.reduce((acc: any, cur: any) => {
    if (acc.hasOwnProperty(cur.selectedSlot)) {
      return {
        ...acc,
        [cur.selectedSlot]: acc[cur.selectedSlot] + 1,
      }
    } else {
      return {
        ...acc,
        [cur.selectedSlot]: 1,
      }
    }
  }, {})

const SlotPicker = () => {
  const [loading, setLoading] = useState(true)
  const [terminsBooked, setTerminsBooked] = useState([])
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedSlot = getDefaultSlot(), selectedDate } = useAppSelector(
    state => state.booking
  )
  const { shopInfo, allCommingTermins } = useAppSelector(state => state.shop)

  const pickedDayTermins = getDateBookings(allCommingTermins, selectedDate)

  // console.log(reduceTermins(pickedDayTermins))

  const { weekdays, time } = shopInfo?.settings || {}

  const dayDisable =
    weekdays?.includes(dayjs(selectedDate).day()) &&
    dayjs().date() === dayjs(selectedDate).date()
  useEffect(() => {
    // Need dispatch selectedSlot, otherwise it'll be udnefine as a intialState
    dispatch(setSelectedSlot(getDefaultSlot()))
  }, [])

  return (
    <WrapColSt>
      <TitleBannerSt>
        <h5>{t("booking.slot.lunch")}</h5>
      </TitleBannerSt>
      <ButtonGroupSt>
        {morningSlots.map((slot, index) => {
          return (
            <ButtonSlotSt
              $slotactive={selectedSlot === index ? true : undefined}
              key={index + slot}
              onClick={() => {
                dispatch(setSelectedSlot(index))
              }}
              disabled={
                dayjs().hour() + 2 >= Number(slot.split(":")[0]) &&
                dayjs().date() === dayjs(selectedDate).date()
              }
            >
              {slot}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
      <TitleBannerSt>
        <h5>{t("booking.slot.dinner")}</h5>
        {selectedDate && isWeekend(selectedDate) ? (
          <span>{t("booking.slot.warning")}</span>
        ) : null}
      </TitleBannerSt>
      <ButtonGroupSt>
        {afternoonSlots.map((slot, index: number) => {
          const newIndex = morningSlots?.length + index
          return (
            <ButtonSlotSt
              $slotactive={selectedSlot === newIndex ? true : undefined}
              disabled={
                (dayDisable && dayjs().hour() >= Number(time?.split(":")[0])) ||
                (dayjs().hour() + 2 >= Number(slot.split(":")[0]) &&
                  dayjs().date() === dayjs(selectedDate).date()) ||
                reduceTermins(pickedDayTermins)[String(newIndex)] >= 2
              }
              key={newIndex + slot}
              onClick={() => {
                dispatch(setSelectedSlot(newIndex))
              }}
            >
              {reduceTermins(pickedDayTermins)[String(newIndex)] >= 2
                ? "full"
                : slot}
              {/* {slot} */}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
    </WrapColSt>
  )
}

export default SlotPicker
