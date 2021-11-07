import { Link } from "gatsby-plugin-react-i18next"
import { styled } from "@mui/material/styles"

export const SideBarMenuSt = styled("div")`
  position: relative;
  width: 210px;
  height: auto;
  margin-top: 0;
  float: left;
  min-height: 800px;
`

export const MenuSt = styled("div")`
  overflow: visible;
  white-space: nowrap;
  width: 100%;
  padding-top: 60px;
  position: fixed;
  left: 0;
`

export const LinkSt = styled(Link)`
  width: 210px;
  display: flex;
  align-items: center;
  height: 36px;
  margin-left: 0;
  padding: 0 12px 0 24px;

  transition: border-radius 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  color: ${({ theme }) => theme.color.text};
  svg {
    margin-right: 24px;
  }
`
