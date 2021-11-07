import React from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

import { WrapLogoSt, WrapAddressSt, TitleSt, SpanSt } from "./ShopLogo.css"

interface IshopInfo {
  email: string
  address: string
  phone: string
  logo: IGatsbyImageData
  shopId: string
  shopName: string
}
interface IshopLogoProps {
  shopinfo: IshopInfo
}

const ShopLogo: React.FC<IshopLogoProps> = ({ shopinfo }) => {
  const image = getImage(shopinfo.logo) as IGatsbyImageData
  const { shopName, address, email, phone } = shopinfo
  return (
    <WrapLogoSt>
      <WrapAddressSt>
        <TitleSt> {shopName} </TitleSt>
        <SpanSt>{address}</SpanSt>
        {/* <SpanSt>Phone: {phone} </SpanSt>
        <SpanSt>{email}</SpanSt> */}
      </WrapAddressSt>
      <GatsbyImage image={image} alt="Image" />
    </WrapLogoSt>
  )
}

export default ShopLogo
