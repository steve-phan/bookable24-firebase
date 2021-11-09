import { CircularProgress } from "@mui/material"
import React from "react"

import { SectionLoadingSt } from "./Loading.css"

const SectionLoading = () => {
  return (
    <SectionLoadingSt>
      <CircularProgress />
    </SectionLoadingSt>
  )
}

export default SectionLoading
