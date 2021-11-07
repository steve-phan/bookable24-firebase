import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import Hero from "../components/ContentComponents/Hero"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import WhyUs from "../components/ContentComponents/WhyUs"

const IndexPage: React.FC<PageProps> = ({ location, data }) => {
  const { t } = useTranslation()
  return (
    <Layout location={location}>
      <SEO title={t("Home")} />
      <Hero />
      <WhyUs />
    </Layout>
  )
}

export default IndexPage

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
