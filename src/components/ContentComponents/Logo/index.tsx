import React from "react"

import { WrapLogoSt } from "./logo.css"
import bookable24 from "./bookable24.png"

const Logo = () => {
  return (
    <WrapLogoSt to="/">
      <img
        width={40}
        height={40}
        src={bookable24}
        alt="BookAble24 Online Booking System"
      />
      <span>ookable24</span>
    </WrapLogoSt>
  )
}

export default Logo
