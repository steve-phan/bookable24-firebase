// import styled from "styled-components"
import Stepper from "@mui/material/Stepper"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import { styled, alpha } from "@mui/material/styles"

export const WrapTerminSt = styled("div")(({ theme }) => ({
  // position: "relative",
  margin: "0 auto",
  maxWidth: 580,
  borderRadius: 4,
  overflow: "hidden",
  width: "98%",
  // background: "red",
}))

export const WrapTerminContentSt = styled("div")(({ theme }) => ({
  position: "relative",
  minHeight: 500,
  // margin: "0 auto",
  // maxWidth: 580,
  // borderRadius: 4,
  // overflow: "hidden",
  // width: "98%",
  // background: "pink",
}))

export const StepperSt = styled(Stepper)`
  margin-bottom: 10px;
  padding: 20px 6px 20px;
`

export const StepLabelSt = styled(StepLabel)`
  flex-direction: column;
  text-align: center;

  span {
    margin-top: 5px;
  }
`

export const WrapRowSt = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  margin: 20px auto;
`
export const WrapColSt = styled("div")`
  padding: 16px 8px;
`

export const ButtonSt = styled(Button)`
  width: 48%;
  height: 40px;
  font-weight: bold;
  background: ${({ theme }) => theme.color.primary};

  :hover {
    background: ${({ theme }) => alpha(theme.color.primary, 0.6)};
  }
`

export const CanCelButtonSt = styled(ButtonSt)(({ theme }) => ({
  width: "100%",

  [theme.breakpoints.up("md")]: {
    width: 300,
    margin: "0 auto",
    display: "block",
    marginTop: 36,
  },
}))

export const ShowNotice = styled("div")({
  padding: 16,
  paddingTop: 40,
  textAlign: "center",
})
