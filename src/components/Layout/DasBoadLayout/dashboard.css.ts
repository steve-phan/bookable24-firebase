import { styled } from "@mui/material/styles"
import { style } from "@mui/system"

import { drawerWidth } from "src/components/Layout/DasBoadLayout/config"

export const WrapDashBoardSt = styled("div")(({ theme }) => ({
  position: "relative",
  top: 0,
  height: "100vh",
}))

export const DashBoardContentSt = styled("main")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  overflow: "auto",
  position: "relative",
  float: "right",
  maxHeight: "100%",
  width: "100%",
}))

export const WrapContentSt = styled("div")(({ theme }) => ({
  paddingTop: 100,
}))

export const WrapSideBarSt = styled("div")(({ theme }) => ({
  "& .MuiPaper-root": {
    paddingTop: 64,
    width: `${drawerWidth}px`,
    borderRight: "unset",
    justifyContent: "space-evenly",
  },
}))
