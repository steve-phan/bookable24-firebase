import { Link } from "gatsby-plugin-react-i18next"
import { styled, alpha } from "@mui/material/styles"

export const CTAButtons = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 20px;
  text-transform: uppercase;
`

export const LoginButton = styled(CTAButtons)`
  padding: 10px 16px;
  margin: 0 auto;
`
export const WrapLoginSt = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}))

export const DashBoardButtonSt = styled(CTAButtons)(({ theme }) => ({
  background: theme.color.black,
  color: alpha(theme.color.primary, 0.86),
}))
