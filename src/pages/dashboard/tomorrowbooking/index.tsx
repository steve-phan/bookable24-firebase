import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import TomorrowDashBoard from "src/components/DashBoard/TomorrowBookings/TomorrowBookings"

const TomorrowBooking = () => {
  return (
    <DashBoardLayout>
      <TomorrowDashBoard />
    </DashBoardLayout>
  )
}

export default TomorrowBooking

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
