import { styled } from "@mui/material/styles"

export const LoadingSt = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: 2021,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",

  "& svg": {
    color: "#f05123",
  },
}))

export const SectionLoadingSt = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 2021,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",

  "& svg": {
    color: "#f05123",
  },
}))
