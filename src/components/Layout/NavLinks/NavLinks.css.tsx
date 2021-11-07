import { Link } from "gatsby-plugin-react-i18next"
import { styled, alpha } from "@mui/material/styles"
import Drawer from "@mui/material/Drawer"

import { getRandomColor } from "src/utils"

export const PageLinkSt = styled(Link)(({ theme }) => ({
  color: alpha(theme.color.text, 0.8),
  fontWeight: "bold",
  margin: "0 8px",
  paddingTop: 10,
  paddingBottom: 4,
}))

export const LinkItemSt = styled(Link)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  padding: "12px 8px",
  marginTop: 6,
  display: "flex",
  alignItems: "center",
  color: theme.color.white,

  "& svg": {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 18,
    color: theme.color.primary,
  },
}))

export const WrapLoginMobileSt = styled("div")`
  order: 1;
  display: flex;
  place-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid white;
`

export const DrawerSt = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root ": {
    justifyContent: "space-evenly",
  },
}))

export const CTAButtonAccountSt = styled("button")(({ theme }) => ({
  background: theme.color.primary,
  color: theme.color.white,
  border: `1px solid ${theme.color.primary}`,
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  padding: "10px 16px",
  cursor: "pointer",

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))

export const BackgroundImgSt = styled("img")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  opacity: 0.6,
  height: "100vh",
  maxHeight: "100vh",
  width: "100%",
}))
