import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const Contact = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO title="Contact" />

      <h1>vietappeu@gmail.com </h1>
    </Layout>
  )
}

export default Contact
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
