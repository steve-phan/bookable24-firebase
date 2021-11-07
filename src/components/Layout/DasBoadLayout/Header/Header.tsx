import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import { makeStyles } from "@mui/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Hidden from "@mui/material/Hidden"
import Menu from "@mui/icons-material/Menu"
import { Button } from "@mui/material"

import Logo from "src/components/ContentComponents/Logo"

import { AppBarSt } from "./Header.css"
import LangSelect from "../../LangSelect"
import { IMobileToggle } from "../"

export default function Header({
  mobileOpen,
  handleDrawerToggle,
}: IMobileToggle) {
  return (
    <AppBarSt position="fixed" color="default">
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}
      >
        <Logo />
        {/* <Button href="#">Online Booking System</Button> */}
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <LangSelect />
        </Hidden>
      </Toolbar>
    </AppBarSt>
  )
}
