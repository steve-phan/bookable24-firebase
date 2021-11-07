import React, { useRef, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setGuestInfo,
  setGuestValidInfo,
  TGuestInfo,
} from "src/store/shop/bookingSlice"
import { validateEmail, validatePhone } from "src/utils"

import { TextFieldSt, TypographySt } from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"

const InfoUser = () => {
  const nRef = useRef<ReturnType<typeof setTimeout>>()
  const dispatch = useAppDispatch()
  const {
    guestInfo: { firstName, lastName, email, phone, require },
  } = useAppSelector(state => state.booking)

  useEffect(() => {
    if (firstName && lastName && validateEmail(email) && validatePhone(phone)) {
      dispatch(setGuestValidInfo(true))
    }
  }, [email, phone, firstName, lastName])

  const handleChangeInput =
    (key: TGuestInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (nRef.current) {
        clearTimeout(nRef.current)
      }
      nRef.current = setTimeout(() => {
        dispatch(setGuestInfo([key, event.target.value]))
        nRef.current = undefined
      }, 300)
    }
  return (
    <WrapColSt>
      <TextFieldSt
        defaultValue={firstName}
        variant="filled"
        name="firstName"
        placeholder="Vorname"
        label="Vorname*"
        onChange={handleChangeInput("firstName")}
      />
      <TextFieldSt
        defaultValue={lastName}
        variant="filled"
        name="lastName"
        placeholder="Nachname"
        label="Nachname*"
        onChange={handleChangeInput("lastName")}
      />
      <TextFieldSt
        defaultValue={email}
        variant="filled"
        name="email"
        placeholder="johndoe@mail.com"
        label="E-Mail*"
        error={!!email && !validateEmail(email)}
        helperText={
          email &&
          !validateEmail(email) &&
          "Bitte geben Sie eine gültige E-Mail-Adresse ein."
        }
        onChange={handleChangeInput("email")}
      />
      <TextFieldSt
        defaultValue={phone}
        variant="filled"
        name="phone"
        placeholder="+491723567890"
        label="Telefonnummer*"
        error={!!phone && !validatePhone(phone)}
        helperText={
          phone &&
          !validatePhone(phone) &&
          "Bitte geben Sie eine gültige Telefonnummer ein."
        }
        onChange={handleChangeInput("phone")}
      />
      <TextFieldSt
        defaultValue={require}
        id="outlined-multiline-static"
        label="Besondere Wünsche hinzufügen"
        multiline
        rows={4}
        name="require"
        placeholder="Sonderwünsche eingeben (ohne Gewähr)"
        variant="filled"
        onChange={handleChangeInput("require")}
      />
      <TypographySt>
        Alle Felder, die mit einem Sternchen (*) gekennzeichnet sind, müssen bei
        der Anmeldung ausgefüllt werden.
      </TypographySt>
    </WrapColSt>
  )
}

export default InfoUser
