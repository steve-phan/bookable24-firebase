import React from "react"
import { Container, Grid } from "@mui/material"
import { useTheme, ThemeOptions } from "@mui/material/styles"
import {
  BrushOutlined,
  CheckCircleOutline,
  EventAvailable,
  HourglassEmpty,
  ThumbUpOutlined,
  TrendingUp,
} from "@mui/icons-material"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { GridSt, BoxCenter, BoxContent } from "./WhyUs.css"

const getIcon = (
  num: number,
  color = "#e84b63",
  fontSize = 35
): JSX.Element => {
  switch (num) {
    case 1:
      return <TrendingUp style={{ fontSize, color }} />
    case 2:
      return <EventAvailable style={{ fontSize, color }} />
    case 3:
      return <HourglassEmpty style={{ fontSize, color }} />
    case 4:
      return <ThumbUpOutlined style={{ fontSize, color }} />
    case 5:
      return <BrushOutlined style={{ fontSize, color }} />
    case 6:
      return <CheckCircleOutline style={{ fontSize, color }} />

    default:
      return <></>
  }
}

const WhyUs = () => {
  const { t } = useTranslation()
  const theme = useTheme<ThemeOptions>()

  const data = [...Array(6)].map((_, i) => t(`whyus.item${i + 1}`))
  return (
    <Container style={{ marginTop: 40, marginBottom: 20, padding: 8 }}>
      <Grid container style={{ marginTop: 20 }}>
        {data.map((item: string, i: number) => (
          <GridSt item xs={12} sm={6} key={i + item}>
            <BoxCenter>{getIcon(i + 1, theme.color.iconColor)}</BoxCenter>

            <BoxContent>{item}</BoxContent>
          </GridSt>
        ))}
      </Grid>
    </Container>
  )
}

export default WhyUs
