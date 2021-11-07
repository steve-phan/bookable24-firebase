import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme, ThemeOptions } from "@mui/material/styles"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import Carousel from "react-material-ui-carousel"

import freeTermin from "src/images/free.svg"
import proTermin from "src/images/pro.svg"

const useStyles = makeStyles((theme: Theme) => ({
  wrapCarousel: {
    display: "grid",
    placeItems: "center",
    height: 450,
    [theme.breakpoints.down("lg")]: {
      height: 450,
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  wrapCard: {
    margin: "30px 8px 20px",

    paddingTop: 20,
    paddingBottom: 20,

    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  details: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  content: {
    paddingTop: 0,
    flex: "1 0 auto",
    textAlign: "center",
    userSelect: "none",
  },
  desc: {
    marginTop: 10,
  },
  cover: {
    width: "50%",
    backgroundSize: "contain",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
      height: "60vw",
      margin: "0 auto",
    },
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  btnMore: {
    textDecoration: "none",
    fontWeight: 600,
    color: "white",
  },
}))
const Hero = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  const items = [
    {
      name: t("hero.item1.name"),
      image: freeTermin,
      description: t("hero.item1.description"),
    },
    {
      name: t("hero.item2.name"),
      image: proTermin,
      description: t("hero.item2.description"),
    },
    // {
    //   name: 'on Time',
    //   image: calendar,
    //   description:
    //     'Haben Sie umfang­reichere An­forderungen an die Funktionalität der Online-Termin­buchung, so ist Terminland Profi für Sie das passende Produkt. Für einen einfachen Einstieg, starten Sie mit einem für Ihr Einsatz­gebiet vor­konfigurierten System. Dieses können Sie anschließend an Ihre An­forderungen anpassen und nach Ihren Wünschen konfigurieren. So erhalten Sie ein Online-Termin­buchungs­system mit höchster Effizienz.',
    // },
  ]
  function Item({ item }: any) {
    const classes = useStyles()
    return (
      <Card className={classes.wrapCard}>
        <CardMedia
          className={classes.cover}
          image={item.image}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {item.name}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.desc}
              color="textSecondary"
            >
              {item.description}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <Button variant="contained" color="primary">
              <a
                href="https://bookable24.de/shop-test1234561"
                className={classes.btnMore}
              >
                Test Demo
              </a>
            </Button>
          </div>
        </div>
      </Card>
    )
  }
  return (
    // <div>
    //   <RedBackgroundSection />{" "}
    //  <RedShape />
    // </div>
    <Grid container>
      <Grid item md={6} xs={12}>
        <Link
          style={{
            textAlign: "center",
            textDecoration: "underline",
          }}
          to="/shop-test1234561"
        >
          <h2>Demo Booking Page XXXX</h2>
        </Link>
      </Grid>
      <Grid item md={6} xs={12}>
        <Link
          style={{
            textAlign: "center",
            textDecoration: "underline",
          }}
          to="/login"
        >
          <h2>Login Admin Page</h2>
        </Link>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Typography>Email: bookable24.de@gmail.com</Typography>
          <Typography>Pass: 12345678</Typography>
        </div>
      </Grid>
    </Grid>

    // <Carousel
    //   className={classes.wrapCarousel}
    //   animation="slide"
    //   stopAutoPlayOnHover
    //   // autoPlay
    //   swipe
    //   indicatorContainerProps={{
    //     style: {
    //       position: "absolute",
    //       paddingTop: 20,
    //       bottom: 0,
    //     },
    //   }}
    // >
    //   {items.map((item, i) => (
    //     <Item key={i} item={item} />
    //   ))}
    // </Carousel>
  )
}

export default Hero
