// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module "react-helmet"
declare module "@contentful/rich-text-html-renderer"
declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.png" {
  const value: any
  export default value
}
declare module "*.jpg" {
  const value: any
  export default value
}
