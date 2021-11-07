import { Grid } from "@mui/material"
import { styled } from "@mui/material/styles"

export const GridIconSt = styled(Grid)(({ theme }) => ({
  paddingLeft: 13,
  //   flexGrow: 1,
  textAlign: "left",
}))

export const GridItemPhonelSt = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "left",
}))

export const GridItemEmailSt = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "right",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}))

export const SpanRequireSt = styled("p")(({ theme }) => ({
  color: "red",
  paddingLeft: 22,
  marginTop: 6,
  marginBottom: 6,
  maxWidth: 600,
}))
