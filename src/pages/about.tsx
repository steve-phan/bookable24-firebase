import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const About: React.FC<PageProps> = ({ location, data }) => {
  const { t } = useTranslation()

  return (
    <Layout location={location}>
      <SEO title="Our blog" />

      <h1>Google Adsend place :) </h1>
    </Layout>
  )
}

export default About

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
