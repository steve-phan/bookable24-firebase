import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import { PageProps } from "gatsby"

import Layout from "../components/Layout/Layout"
import Recover from "../components/Account/Recover/Recover"
import SEO from "../components/seo"

const Login: React.FC<PageProps> = ({ location, data }) => {
  const { t } = useTranslation()

  return (
    <Layout location={location}>
      <SEO title="Recover Password BookAble24" />

      <Recover />
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
