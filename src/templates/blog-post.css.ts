import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

export const GatsbyImageSt = styled(GatsbyImage)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding-bottom: 24px;
`

export const CtaPagesSt = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  border-bottom: 1px solid #cecece;

  a {
    color: ${({ theme }) => theme.color.primary};
  }
`
