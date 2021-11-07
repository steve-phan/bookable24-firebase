import React from "react"
import { ThankYouSt } from "./StepComponents.css"
import { useAppSelector } from "../../../store/hooks"
import { useTranslation } from "gatsby-plugin-react-i18next"

const ThankYou = () => {
  const {
    guestInfo: { email, lastName, firstName },
  } = useAppSelector(state => state.booking)
  const { t } = useTranslation()

  return (
    <ThankYouSt>
      {/* <Loading /> */}
      <p>{t("thankyou.thank") + lastName + " " + firstName}</p>
      <p>{t("thankyou.text") + " " + email}</p>
    </ThankYouSt>
  )
}

export default ThankYou
