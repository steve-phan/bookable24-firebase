import { styled } from "@mui/material/styles"
import { Container, Grid } from "@mui/material"

export const GridSt = styled(Grid)(({ theme }) => ({
  boxShadow: "0 0.125rem 1.25rem 0 rgb(86 93 100 / 10%)",

  "&:hover": {
    //   backgroundColor: "red",
    transform: "scale(1.01)",
  },
}))

export const BoxCenter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",

  paddingTop: 16,
}))

export const BoxContent = styled("div")(({ theme }) => ({
  padding: 15,
  color: "#615e5e",
  marginBottom: 20,
  textAlign: "center",
}))
