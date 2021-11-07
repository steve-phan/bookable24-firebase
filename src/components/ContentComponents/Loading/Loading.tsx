import { CircularProgress } from "@mui/material"
import React from "react"

import { LoadingSt } from "./Loading.css"

const Loading = () => {
  return (
    <LoadingSt>
      <CircularProgress />
    </LoadingSt>
  )
}

export default Loading
