import { useStaticQuery, graphql } from "gatsby"

export const useShopname = () => {
  const data = useStaticQuery(
    graphql`
      query shopName {
        allContentfulShopInfo {
          nodes {
            shopId
            email
          }
        }
      }
    `
  )

  return data?.allContentfulShopInfo?.nodes
}
