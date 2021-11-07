import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import Seo from "../components/seo"

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>

      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <h1>{t("notfound")}</h1>
    </Layout>
  )
}

export default NotFoundPage

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
