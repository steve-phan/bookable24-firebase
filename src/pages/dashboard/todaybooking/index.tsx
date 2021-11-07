import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import TodayDashBoard from "src/components/DashBoard/TodayBookings/TodayBookings"

const TodayBooking = () => {
  return (
    <DashBoardLayout>
      <TodayDashBoard />
    </DashBoardLayout>
  )
}

export default TodayBooking

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
