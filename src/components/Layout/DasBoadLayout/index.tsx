import { graphql } from "gatsby"
import { ThemeProvider } from "@mui/material/styles"
import { ThemeProvider as ThemeProviderSt } from "styled-components"
import React, { ReactNode, useEffect } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import CssBaseline from "@mui/material/CssBaseline"

import { useShopname } from "src/components/Account/accountHook"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { checkUserAuth } from "src/store/shop/shopSlice"
import SideBar from "src/components/Layout/DasBoadLayout/SideBar"
import Header from "src/components/Layout/DasBoadLayout/Header/Header"
import { theme } from "src/theme"
import Loading from "src/components/ContentComponents/Loading/Loading"

import { inputGlobalStyles } from "../Layout"
import {
  WrapDashBoardSt,
  DashBoardContentSt,
  WrapContentSt,
} from "./dashboard.css"

export interface IMobileToggle {
  mobileOpen?: boolean
  handleDrawerToggle?: () => void
}

const DashBoardLayout = ({
  children,
  location,
}: {
  children: ReactNode
  location?: any
}) => {
  const { navigate } = useI18next()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const dispatch = useAppDispatch()
  const { isShopLogin, status } = useAppSelector(state => state.shop)

  const shopList = useShopname()

  useEffect(() => {
    if (!isShopLogin && status === "logout") {
      navigate("/login")
      // dispatch(checkUserAuth(shopList))
    }
  }, [status])

  if (status !== "login") {
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderSt theme={theme}>
        <CssBaseline />
        {inputGlobalStyles}
        <WrapDashBoardSt>
          <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <DashBoardContentSt>
            <Header
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
            <WrapContentSt>{children}</WrapContentSt>
          </DashBoardContentSt>
        </WrapDashBoardSt>
      </ThemeProviderSt>
    </ThemeProvider>
  )
}

export default DashBoardLayout
