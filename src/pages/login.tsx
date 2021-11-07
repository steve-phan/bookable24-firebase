import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { useEffect } from "react"
import { PageProps } from "gatsby"

import Layout from "../components/Layout/Layout"
import SignIn from "../components/Account/SignIn/SignIn"
import SEO from "../components/seo"

const Login: React.FC<PageProps> = ({ location, data }) => {
  const { t } = useTranslation()

  return (
    <Layout location={location}>
      <SEO title="Login BookAble24" />

      <SignIn location={location} />
    </Layout>
  )
}

export default Login

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
