export const createShopName = (company: string, cityCode: string) => {
  let shopName: string = company
    .toLowerCase()
    .split(" ")
    .filter(str => !!str)
    .join("-")

  shopName = shopName + cityCode + Math.floor(Math.random() * 100)

  return shopName
}
