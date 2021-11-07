import "@mui/material/styles"
declare module "@mui/material/styles" {
  export interface Theme {
    color: {
      primary: string
      secondary: string
      warning: string
      white: string
      gray: string
      text: string
      invalid: string
      background: string
      black: string
      activeBackground: string
      activeColor: string
      iconColor: string
    }
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    color: {
      primary: string
      secondary: string
      warning: string
      white: string
      gray: string
      text: string
      invalid: string
      background: string
      black: string
      activeBackground: string
      activeColor: string
      iconColor: string
    }
  }
}
