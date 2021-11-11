export interface IshopInfo {
  city: string
  cityCode: string
  company: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  shopName: string
  street: string
  uid?: string
  isActive: boolean
  settings: {
    time: string
    weekdays: number[]
  }
}

export interface IshopState {
  shopInfo: IshopInfo
  status: "login" | "loading" | "logout"
  isShopLogin: boolean
  allTermins: any[]
  allCommingTermins: any[]
  settings: {
    time: string
    weekdays: number[]
  }
}

export interface IshopQuery {
  shopEmail: string
  shopName: string
  // isShopLogin: boolean
}

export interface Iaccount {
  email: string
  password: string
}

export interface IbookingState {
  numberOfGuest: number
  selectedDate: Date | null
  selectedSlot: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    require: string
  }
  isValidInfo: boolean
}
