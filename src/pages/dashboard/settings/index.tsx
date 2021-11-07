import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import SettingsDashBoard from "src/components/DashBoard/Settings/Settings"

const Settings = () => {
  return (
    <DashBoardLayout>
      <SettingsDashBoard />
    </DashBoardLayout>
  )
}

export default Settings

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
