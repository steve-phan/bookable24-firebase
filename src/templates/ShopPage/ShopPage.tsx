import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import Step from "@mui/material/Step"
import { Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"
import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo"
import SectionLoading from "src/components/ContentComponents/Loading/SectionLoading"

import ColorlibStepIcon from "./ColorlibStepIcon"
import {
  WrapTerminSt,
  WrapTerminContentSt,
  StepperSt,
  StepLabelSt,
  WrapRowSt,
  ButtonSt,
  ShowNotice,
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
        .post("/get-reservation", { bookingId, shopName })
        .then(res => {
          const { booking: infoBooking } = res.data as { booking: any }
          setBooking(infoBooking)
        })
        .catch(err => console.log("err", err))
    } else {
      dispatch(
        getShopinfo({
          shopName,
          shopEmail,
        })
      )
      setShowCancelBooking(false)
    }
  }, [])

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false)
    }
  }, [shopInfo.isActive, shopInfo.email])

  const handleConfirmSubmit = () => {
    const dataBooking = {
      selectedDate,
      selectedSlot,
      userinfo: { ...guestInfo },
      person: numberOfGuest,
      require: guestInfo.require,
      shopInfo,
    }
    setIsLoading(true)
    axios
      .post("/reservation", dataBooking)
      .then(res => {
        setTimeout(() => {
          setIsLoading(false)
          handleNext()
        }, 300)
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
      <WrapTerminSt>
        <ShopLogo shopinfo={data.contentfulShopInfo} />
        <WrapTerminContentSt>
          {isLoading || status === "loading" ? (
            <SectionLoading />
          ) : !shopInfo.isActive && !isLoading ? (
            <ShowNotice>
              <Typography variant="h4">
                This Account is not active yet
              </Typography>
              <br />
              <Typography>Please contact: bookable24.de@gmail.com</Typography>
            </ShowNotice>
          ) : (
            <>
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
