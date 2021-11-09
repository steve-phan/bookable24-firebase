import {
  TextField,
  Typography,
  FormControl,
  Button,
  Modal,
} from "@mui/material"
import { alpha, styled } from "@mui/material/styles"

export const WrapColSt = styled("div")`
  position: relative;
  padding: 16px 8px;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 8px;
  margin: 0 auto;
  border: 0;
  vertical-align: top;
  margin-bottom: 16px;
  width: 100%;
  max-width: 560px;
`

export const TextFieldSt = styled(TextField)(({ theme }) => ({
  marginBottom: 24,
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
  fontSize: 16,
  color: "#333",
  marginBottom: 16,
  //   borderLeft: `2px solid red`,
}))

export const FormControlSt = styled(FormControl)(({ theme }) => ({
  marginBottom: 24,

  width: "100%",
  "& label.Mui-focused": {
    color: theme.color.primary,
  },
  "& >:after": {
    borderBottom: `1px solid ${theme.color.primary} !important`,
  },
}))

export const ButtonSt = styled(Button)(({ theme }) => ({
  background: theme.color.primary,
  fontWeight: "bold",
  width: "100%",
  marginTop: 24,
  marginBottom: 16,

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))

export const WrapModalSt = styled(Modal)(({ theme }) => ({
  "& .MuiBox-root": {
    borderRadius: 4,
    padding: 16,
    border: `1px solid ${theme.color.primary}`,
    maxWidth: "96%",

    "& p": {
      marginBottom: 0,
    },
  },
}))
