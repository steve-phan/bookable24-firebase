import { async } from "@firebase/util"
import { Email } from "@mui/icons-material"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATES } from "mongoose"
// import {} from "firebase"

import { auth } from "src/firebase"
import { getShopName } from "src/utils"

import { AppThunk } from "../store"
import { IshopState, IshopQuery, IshopInfo } from "./shop.types"

export const checkUserAuth =
  (shopList: any[]): AppThunk =>
  (dispatch, getState) => {
    if (typeof window !== "undefined") {
      const user = auth.currentUser
      if (user?.email) {
        console.log("email", user?.email)
        const shopName = getShopName(user.email, shopList)
        dispatch(getAllShopBookings({ shopName }))
        // dispatch(
        //   getShopinfo({
        //     shopEmail: user?.email || "",
        //     shopName,
        //     // isShopLogin: true,
        //   })
        // )
      } else {
        // No user is signed in.
        dispatch(setShopLogout())
      }
    }
  }

const intinitialShopState: IshopState = {
  shopInfo: {
    city: "",
    cityCode: "",
    company: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    shopName: "",
    street: "",
    uid: "",
    settings: {
      time: "12:30",
      weekdays: [],
    },
  },
  isShopLogin: false,
  status: "loading",
  allTermins: [],
  allCommingTermins: [],
  settings: {
    time: "12:30",
    weekdays: [],
  },
}

export const getAllShopBookings = createAsyncThunk(
  "shop/getAllShopBookings",
  async ({ shopName }: { shopName: string }) => {
    const response: any = await axios.post("/all-shop-bookings", {
      shopName,
    })
    console.log(response.data)
    const { allTermins, shopInfo } = response.data
    return { allTermins, shopInfo }
  }
)

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async ({ shopEmail, shopName }: IshopQuery) => {
    console.log("getShopInfo", "trigger")
    const response: any = await axios.get("/shopinfo", {
      headers: {
        shopEmail,
        shopName,
      },
    })

    const {
      bookings,
      shopinfo: shopInfo,
    }: { bookings: any[]; shopinfo: IshopInfo } = response.data
    return { bookings, shopInfo }
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState: intinitialShopState,
  reducers: {
    setShopInfo: (state, action) => {
      state.status = "login"
      state.isShopLogin = true
      state.shopInfo = { ...state.shopInfo, ...action.payload.shopInfo }
    },

    setShopLogout: state => {
      state.status = "logout"
      state.isShopLogin = false
      state.shopInfo = intinitialShopState.shopInfo
    },
    setSettingDisableTime: (state, action) => {
      if (action.payload) {
        state.shopInfo.settings.time = action.payload
      }
    },
    setSetingsDisableDays: (state, action) => {
      state.shopInfo.settings.weekdays = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IshopState) => {
        state.status = "loading"
      })
      .addCase(getAllShopBookings.pending, state => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        const {
          city,
          cityCode,
          company,
          email,
          firstName,
          lastName,
          phoneNumber,
          shopName,
          street,
          uid,
          settings,
        } = action.payload.shopInfo
        const { time, weekdays } = settings || {}
        const newarr = [
          ...action.payload.bookings.filter(termin => !termin.status),
        ]
        // const isShopLogin = action.payload.isShopLogin ? true : false
        // const status = action.payload.isShopLogin ? "login" : "logout"

        return {
          ...state,
          allCommingTermins: [...newarr],
          shopInfo: {
            city,
            cityCode,
            company,
            email,
            firstName,
            lastName,
            phoneNumber,
            shopName,
            street,
            uid,
            settings: {
              time,
              weekdays,
            },
          },
        }
      })
      .addCase(getAllShopBookings.fulfilled, (state, action) => {
        const {
          city,
          cityCode,
          company,
          email,
          firstName,
          lastName,
          phoneNumber,
          shopName,
          street,
          uid,
          settings,
        } = action.payload.shopInfo
        const { time, weekdays } = settings || {}
        const newarr = [
          ...action.payload.allTermins.filter((termin: any) => !termin.status),
        ]

        return {
          ...state,
          allTermins: [...newarr],
          isShopLogin: true,
          status: "login",
          shopInfo: {
            city,
            cityCode,
            company,
            email,
            firstName,
            lastName,
            phoneNumber,
            shopName,
            street,
            uid,
            settings: {
              time,
              weekdays,
            },
          },
        }
      })
      .addCase(getShopinfo.rejected, state => {
        state.status = "logout"
      })
      .addCase(getAllShopBookings.rejected, state => {
        state.status = "logout"
      })
  },
})

export const {
  setShopInfo,
  setShopLogout,
  setSetingsDisableDays,
  setSettingDisableTime,
} = shopSlice.actions

export default shopSlice.reducer
