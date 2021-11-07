import Step from "@mui/material/Step"
import { makeStyles } from "@mui/styles"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"
import Loading from "src/components/ContentComponents/Loading/Loading"
import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo"

import ColorlibStepIcon from "./ColorlibStepIcon"
import {
  WrapTerminSt,
  WrapTerminContentSt,
  StepperSt,
  StepLabelSt,
  WrapRowSt,
  ButtonSt,
} from "./ShopPage.css"
import { getStepContent, allSlots, getDefaultSlot } from "./utils"
import ShopLogo from "./ShopLogo/ShopLogo"
import CancelBooking from "./CancelBooking/CancelBooking"

interface IShopPageProps {
  pageContext: {
    shopName: string
    shopEmail: string
  }
  data: any // Do it later
  location?: any
}

function getSteps() {
  return [
    "Personen und Datum",
    "Wähle unten eine Zeit aus",
    "Name und Kontaktdaten",
  ]
}

const ShopPage: React.FC<IShopPageProps> = ({
  pageContext,
  data,
  location,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showCancelBooking, setShowCancelBooking] = useState<boolean>(false)
  const [booking, setBooking] = useState<any>()

  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const {
    booking: {
      selectedDate,
      selectedSlot = getDefaultSlot(),
      guestInfo,
      numberOfGuest,
      isValidInfo,
    },
    shop: { shopInfo, status },
  } = useAppSelector(state => state)
  const { shopName, shopEmail } = pageContext

  const steps = getSteps()

  // useEffect(() => {
  //   if (status !== "loading" && !showCancelBooking) {
  //     setIsLoading(false)
  //   }
  // }, [status])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  useEffect(() => {
    if (location.search.includes("?bookingId=")) {
      const bookingId = location.search.replace("?", "").split("=")[1]
      setShowCancelBooking(true)
      axios
        .post(
          "/.netlify/functions/cancel-termin",
          JSON.stringify({ bookingId, shopName, shopInfo })
        )
        .then(res => {
          setIsLoading(false)
          setBooking(res.data)
        })
        .catch(err => console.log("err", err))
    } else {
      dispatch(
        getShopinfo({
          shopName,
          shopEmail,
          isShopLogin: false,
        })
      )
      // setIsLoading(false)
      // setShowCancelBooking(false)
    }
  }, [])

  // const testTime = dayjs("Dec 31").diff()
  // const testTime1 = dayjs().diff("Nov 1 2021")

  // const dateFormatted = dayjs("2021/03/02").format("MMM DD YYYY")
  // console.log("time now is", dateFormatted)

  const handleConfirmSubmit = () => {
    const dataBooking = {
      selectedDate,
      selectedSlot,
      userinfo: { ...guestInfo },
      person: numberOfGuest,
      require: guestInfo.require,
      shopInfo,
    }
    // setIsLoading(true)
    axios
      .post("/reservation", dataBooking)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }

  const isNextButtonDisable = () => {
    return (
      dayjs().hour() >= Number(allSlots[selectedSlot].split(":")[0]) &&
      dayjs().date() === dayjs(selectedDate).date() &&
      activeStep !== 0
    )
  }

  return (
    <Layout isShop location={location}>
      <SEO title="Booking Online System" />
      {/* {!checkShop && <Loading shopname={shopName} />} */}
      <WrapTerminSt>
        <ShopLogo shopinfo={data.contentfulShopInfo} />
        <WrapTerminContentSt>
          {/* {isLoading && <Loading />} */}
          {showCancelBooking ? (
            booking?.email && (
              <CancelBooking
                booking={booking}
                shopName={shopName}
                location={location}
                shopInfo={data.contentfulShopInfo}
              />
            )
          ) : (
            <>
              {activeStep !== 4 && (
                <StepperSt activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {}
                    const labelProps = {}

                    return (
                      <Step
                        style={{ padding: 0, width: "33.3333%" }}
                        key={label}
                        {...stepProps}
                      >
                        <StepLabelSt
                          // className={classes.stepLabel}
                          StepIconComponent={ColorlibStepIcon}
                          {...labelProps}
                        >
                          {label}
                        </StepLabelSt>
                      </Step>
                    )
                  })}
                </StepperSt>
              )}
              <>
                {getStepContent(activeStep)}
                {activeStep !== 4 && (
                  <WrapRowSt>
                    <ButtonSt
                      disabled={activeStep === 0}
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                    >
                      Back
                    </ButtonSt>
                    <ButtonSt
                      disabled={
                        (activeStep === 2 && !isValidInfo) ||
                        isNextButtonDisable()
                      }
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (activeStep < 3) {
                          handleNext()
                        } else {
                          handleConfirmSubmit()
                        }
                      }}
                    >
                      {activeStep < 2
                        ? "Next"
                        : activeStep === 2
                        ? "Preview"
                        : "Book"}
                    </ButtonSt>
                  </WrapRowSt>
                )}
              </>
            </>
          )}
        </WrapTerminContentSt>
      </WrapTerminSt>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
  query ($language: String!, $shopName: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulShopInfo(shopId: { eq: $shopName }) {
      email
      shopName
      shopId
      phone
      address
      logo {
        gatsbyImageData(width: 100, cornerRadius: 3)
      }
    }
  }
`
