import { styled } from "@mui/material/styles"

export const WrapLogoSt = styled("div")(({ theme }) => ({
  background: "black",
  display: "flex",
  padding: "16px 8px",
  justifyContent: "space-between",
  borderRadius: 4,

  "& img": {
    objectFit: "contain !important",
  },
}))

export const WrapAddressSt = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 200,
  flexGrow: 1,
  textAlign: "center",
}))

export const TitleSt = styled("p")(({ theme }) => ({
  color: theme.color.primary,
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
}))

export const SpanSt = styled("p")(({ theme }) => ({
  color: theme.color.white,
  fontSize: 16,
  width: 150,
  margin: "0 auto",
  lineHeight: "22px",
}))
