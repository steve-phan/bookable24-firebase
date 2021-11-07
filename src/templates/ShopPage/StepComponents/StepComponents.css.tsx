import * as React from "react"
import Button, { ButtonProps } from "@mui/material/Button"
import Card from "@mui/material/Card"

import { TextField, Typography } from "@mui/material"
import { alpha, ThemeOptions } from "@mui/material/styles"
import styled from "styled-components"

type TButtonOptions = {
  $slotactive: boolean | undefined
  $slotwarning?: boolean | undefined
}

type TButton = ButtonProps & TButtonOptions

/**
 * @description : Style for SlotPicker Component
 */

export const ButtonGroupSt = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: "6px",
  flexWrap: "wrap",
}))

export const ButtonSlotSt = styled(Button)<TButton>(
  ({ theme, $slotactive, $slotwarning }) => ({
    flexBasis: "calc(33.3% - 4px)",
    border: `1px solid ${alpha(theme.color.primary, 0.3)} !important`,
    borderRadius: "4px !important",
    fontWeight: "bold",

    color: $slotactive ? "white" : theme.color.text,
    background: $slotactive
      ? alpha(theme?.color?.primary, 0.8)
      : // : $slotwarning
        // ? theme.color.warning
        "inherit",

    "&:hover": {
      background: $slotactive ? alpha(theme?.color?.primary, 0.6) : "inherit",
    },
  })
)

export const TitleBannerSt = styled("div")(({ theme }) => ({
  margin: "8px auto",
  padding: 10,
  textAlign: "center",
  background: theme.color.background,

  "& h5": {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 0,
    padding: 10,
  },
  "& span": {
    display: "block",
    fontSize: 14,
    height: "40px",
  },
  "& strong": {
    display: "inline-block",
    borderRadius: 4,
    width: 80,
    height: 26,
    background: theme.color.warning,
    transform: "translateY(7px)",
  },
}))

/**
 * @description Style for InfoUser Component
 */

export const TextFieldSt = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: "100%",
  maxWidth: "560px",
  backgroundColor: theme.color.background,

  "& label.Mui-focused": {
    color: theme.color.primary,
  },
  "& >:after": {
    borderBottom: `1px solid ${theme.color.primary} !important`,
  },
}))

export const TypographySt = styled(Typography)(({ theme }) => ({
  fontSize: 14.5,
  paddingLeft: 10,
  color: "#333",
  borderLeft: `2px solid red`,
}))

/**
 * @description Preview
 *
 */

export const CardSt = styled(Card)(({ theme }) => ({
  padding: "16px 8px",
  marginBottom: 16,
  "& h5": {
    width: "fit-content",
    fontSize: 20,
    lineHeight: "21px",
    borderBottom: `2px solid ${theme.color.warning}`,
    marginBottom: 6,
  },
  "& p": {
    fontSize: 16,
  },
}))

/**
 * @description Thankyou Component
 */

export const ThankYouSt = styled("div")(({ theme }) => ({
  paddingTop: 100,
  textAlign: "center",
  lineHeight: "26px",
}))
