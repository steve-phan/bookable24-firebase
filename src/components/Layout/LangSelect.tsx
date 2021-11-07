import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useI18next } from "gatsby-plugin-react-i18next"
import * as React from "react"
import styled from "styled-components"

import de from "./flag/de.png"
import en from "./flag/en.png"
import vn from "./flag/vn.png"

const StyledSelect = styled(Select)`
  margin-left: 16px;
  .MuiSelect-select {
    width: 32px;
    display: flex;
    justify-content: center;
    border-radius: 50% !important;
    padding-right: 0 !important;
  }
  svg {
    visibility: hidden;
  }
  img {
    margin-bottom: 0;
  }
`

const LangSelect: React.FC = () => {
  const { languages, language, changeLanguage } = useI18next()
  return (
    <StyledSelect
      disableUnderline
      variant="standard"
      value={language}
      onChange={(event: SelectChangeEvent<unknown>) => {
        /* Because this is not a Real Select Tag 
          /* Need using `as string`  */
        changeLanguage(event?.target?.value as string)
      }}
    >
      {languages.map(lng => {
        switch (lng) {
          case "vn":
            return (
              <MenuItem key={lng} value={lng}>
                <img src={vn} alt="VN" width={23} height={23} />
              </MenuItem>
            )
          case "en":
            return (
              <MenuItem key={lng} value={lng}>
                <img src={en} alt="EN" width={23} height={23} />
              </MenuItem>
            )
          case "de":
            return (
              <MenuItem key={lng} value={lng}>
                <img src={de} alt="DE" width={23} height={23} />
              </MenuItem>
            )
          default:
            break
        }
      })}
    </StyledSelect>
  )
}

export default LangSelect
