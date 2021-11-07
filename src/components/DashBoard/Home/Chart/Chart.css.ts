import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"

export const WrapChartSt = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const CircleSt = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 280,
  maxHeight: 280,
  padding: "16px",
  position: "relative",
  display: "flex",
  // flexDirection: 'column',
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
}))

export const NumberSt = styled("div")(({ theme }) => ({
  position: "absolute",
  fontSize: 38,
  color: theme.color.white,
  fontWeight: "bold",
}))

export const TypoTitleSt = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
}))

export const BarSt = styled(CircleSt)(({ theme }) => ({
  maxWidth: 600,
  maxHeight: 600,
}))
