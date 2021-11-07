import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import Loading from "src/components/ContentComponents/Loading/Loading"
import { useAppSelector } from "src/store/hooks"

const WithAuth = () => {
  const { navigate } = useI18next()
  const { isShopLogin, status } = useAppSelector(state => state.shop)
  if (status === "loading" && !isShopLogin) {
    return <Loading />
    // } else if (status === "logout") {
    //   navigate("/login")
    //   return <></>
  } else {
    return <></>
  }
}

export default WithAuth
