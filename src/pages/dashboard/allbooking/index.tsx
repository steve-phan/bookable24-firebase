import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import AllBookingsDashBoard from "src/components/DashBoard/AllBookings/AllBookings"

const AllBookings = () => {
  return (
    <DashBoardLayout>
      <AllBookingsDashBoard />
    </DashBoardLayout>
  )
}

export default AllBookings

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
