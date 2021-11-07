import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Typography } from "@mui/material"
import FilledInput from "@mui/material/FilledInput"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { Link } from "gatsby-plugin-react-i18next"
import React, { useEffect } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { auth } from "src/firebase"

import { getShopName, validateEmail } from "src/utils"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo, checkUserAuth } from "src/store/shop/shopSlice"
import Loading from "src/components/ContentComponents/Loading/Loading"

import {
  ButtonSt,
  FormControlSt,
  TextFieldSt,
  TypographySt,
  WrapColSt,
} from "../Account.css"
import { useShopname } from "../accountHook"

interface IloginStates {
  email: string
  password: string
  showPassword: boolean
  loading: boolean
}

const SignIn = ({ location }: { location: any }) => {
  const { navigate } = useI18next()
  const [values, setValues] = React.useState<IloginStates>({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  })
  const dispatch = useAppDispatch()
  const { isShopLogin, status, allTermins, shopInfo, settings } =
    useAppSelector(state => state.shop)
  const shopList = useShopname()

  useEffect(() => {
    const checkShop = async () => {
      if (isShopLogin) {
        await navigate("/dashboard")
      }
    }
    checkShop()
    return () => {
      checkShop()
    }
  }, [isShopLogin])

  const handleChange =
    (prop: keyof IloginStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === "email") {
        setValues({ ...values, email: event.target.value.toLowerCase() })
        return
      }
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleShopLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      await setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, values.email, values.password)
        })
        .catch(err => console.log(err))
      await dispatch(
        getShopinfo({
          shopemail: values.email,
          shopname: getShopName(values.email, shopList),
          isShopLogin: true,
        })
      )
      await navigate("/dashboard")
    } catch (error) {
      alert("Email or Password was not correct :)")
    }
  }
  return (
    <WrapColSt>
      {status === "loading" && <Loading />}
      <h1>Bereits Kunde?</h1>
      <TypographySt>
        Loggen Sie sich jetzt ein, um alle Vorteile des Kundenkontos
        wahrzunehmen. Neuer Kunde?
        <Link to="/request-account"> Anfrage-Demo</Link>
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
          values.email.length !== 0 && !validateEmail(values.email) ? (
            <> Geben sie eine gültige E-Mail-Adresse an</>
          ) : null
        }
        onChange={handleChange("email")}
      />
      <FormControlSt fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControlSt>
      <Typography>
        <Link to="/recover" className="siteLink">
          Passwort vergessen?
        </Link>
      </Typography>
      <ButtonSt
        size="large"
        variant="contained"
        onClick={handleShopLogin}
        type="submit"
        disabled={
          values.email.length === 0 ||
          !validateEmail(values.email) ||
          values.password.length < 8
        }
      >
        Anmelden
      </ButtonSt>
    </WrapColSt>
  )
}

export default SignIn
