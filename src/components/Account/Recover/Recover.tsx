import { Typography } from "@mui/material"
import { sendPasswordResetEmail } from "firebase/auth"
import { Link } from "gatsby-plugin-react-i18next"
import React from "react"

import { auth } from "../../../firebase"
import { ButtonSt, TextFieldSt, TypographySt, WrapColSt } from "../Account.css"
import { useShopname } from "../accountHook"
import AccountModal from "../AccountModal/AccountModal"
import { validateEmail } from "../../../utils"

interface IloginStates {
  email: string
  modalText: string
  open: boolean
}

const SignIn = () => {
  const [values, setValues] = React.useState<IloginStates>({
    email: "",
    modalText: "",
    open: false,
  })
  const shopList = useShopname()

  const handleChange =
    (prop: keyof IloginStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleShopRecover = async () => {
    setValues({
      ...values,
      open: true,
    })
    try {
      await sendPasswordResetEmail(auth, values.email)
      //   navigate("/")
      setValues({
        ...values,
        open: true,
        modalText: `Sofern unter der E-Mail-Adresse ${values.email} ein Konto besteht, finden Sie die Anleitung zum Zurücksetzen Ihres Passworts im Posteingang. Bitte überprüfen Sie auch Ihren Spamordner.`,
      })
    } catch (error) {
      setValues({
        ...values,
        open: true,
        modalText: `Diese E-Mail ${values.email} ist auf unserem System nicht vorhanden, versuchen Sie es mit der anderen erneut`,
      })
    }
  }
  const handleOpen = () => {
    setValues({ ...values, open: true })
  }
  const handleClose = () => {
    setValues({ ...values, open: false })
  }
  return (
    <WrapColSt>
      <AccountModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={values.open}
        modalText={values.modalText}
      />
      {/* {inputState.loading && <Loading />} */}
      <h1>Passwort vergessen?</h1>
      <TypographySt>
        Geben Sie Ihre E-Mail-Adresse ein, mit der Sie sich bei BookAble24
        registriert haben. Wir senden Ihnen einen Link zum Zurücksetzen des
        Passworts.
      </TypographySt>
      <TextFieldSt
        fullWidth
        value={values.email}
        variant="filled"
        name="email"
        placeholder="johndoe@mail.com"
        label="Email*"
        error={values.email.length === 0 || !validateEmail(values.email)}
        helperText={
          values.email.length === 0 || !validateEmail(values.email) ? (
            <> "Geben sie eine gültige E-Mail-Adresse an" </>
          ) : null
        }
        onChange={handleChange("email")}
      />

      <ButtonSt
        size="large"
        variant="contained"
        onClick={handleShopRecover}
        type="submit"
        disabled={values.email.length === 0 || !validateEmail(values.email)}
      >
        Passwort zurücksetzen
      </ButtonSt>
      <Typography>
        <Link to="/login" className="siteLink">
          Zurück zum Login
        </Link>
      </Typography>
    </WrapColSt>
  )
}

export default SignIn
