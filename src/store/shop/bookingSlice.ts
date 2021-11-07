import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IbookingState } from "./shop.types"

const initialBookingState: IbookingState = {
  numberOfGuest: 1,
  selectedDate: new Date(),
  selectedSlot: 0,
  guestInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    require: "",
  },
  isValidInfo: false,
}

// export const setNumberOfGuest = createAction<number>("booking/number-of-guest")
// const bookingReducers = createReducer(initialBookingState, builder => {
//   builder.addCase(setNumberOfGuest, (state: IbookingState, action) => {
//     console.log("dispatch", action.payload)
//     state.numberOfGuest = action.payload
//   })
// })

export type TGuestInfo =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "require"

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setNumberOfGuest: (state, action: PayloadAction<number>) => {
      state.numberOfGuest = action.payload
    },
    setSelectedSlot: (state, action: PayloadAction<number>) => {
      state.selectedSlot = action.payload
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload
    },
    setGuestInfo: (state, action: PayloadAction<[TGuestInfo, string]>) => {
      state.guestInfo[action.payload[0]] = action.payload[1]
    },
    setGuestValidInfo: (state, action: PayloadAction<boolean>) => {
      state.isValidInfo = action.payload
    },
  },
})
export const {
  setNumberOfGuest,
  setSelectedDate,
  setSelectedSlot,
  setGuestInfo,
  setGuestValidInfo,
} = bookingSlice.actions

export default bookingSlice.reducer
