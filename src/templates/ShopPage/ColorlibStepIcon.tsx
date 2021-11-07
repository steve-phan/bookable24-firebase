import * as React from "react"
import { makeStyles } from "@mui/styles"
import { StepIconProps } from "@mui/material/StepIcon"
import { AvTimer, ContactMail, EventAvailable } from "@mui/icons-material"
import clsx from "clsx"

const useColorlibStepIconStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },

    active: {
      // backgroundColor: theme.palette.primary.main,

      // backgroundImage:
      //   'linear-gradient( 136deg , rgb(242,113,33) 0%, rgb(249 190 84) 50%, rgb(138,35,135) 100%)',
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      //@ts-ignore
      backgroundColor: theme?.color?.primary,
    },
  }
})

const ColorlibStepIcon = (props: StepIconProps) => {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <EventAvailable />,
    2: <AvTimer />,
    3: <ContactMail />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

export default ColorlibStepIcon
