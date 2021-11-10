import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import InfoIcon from "@mui/icons-material/Info"

import { allSlots } from "src/utils"

import { ITermin } from "./DashBoard.types"
import {
  GridIconSt,
  GridItemPhonelSt,
  GridItemEmailSt,
  SpanRequireSt,
} from "./ShareInfo.css"

const createData = ({
  createdAt,
  selectedSlot,
  person,
  firstName,
  lastName,
  phone,
  email,
  require,
  _id,
}: ITermin) => {
  return {
    createdAt,
    selectedSlot,
    person,
    firstName,
    lastName,
    phone,
    email,
    require,
    _id,
    custormer: {
      phone,
      email,
      require,
    },
  }
}

function Row(props: { row: ReturnType<typeof createData>; index: number }) {
  const { row, index } = props
  const [open, setOpen] = React.useState(false)
  const { phone, email, require } = row.custormer
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: index % 2 === 0 ? "#ffffff" : "#faf8f8",
          },
        }}
      >
        <TableCell
          style={{
            width: 60,
            maxWidth: 60,
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {allSlots[Number(row.selectedSlot)]}
        </TableCell>
        <TableCell align="left">{row.person}</TableCell>
        <TableCell align="left">{row.firstName + " " + row.lastName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              style={{
                background: "#f7e5e5",
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 8,
              }}
            >
              <Grid
                container
                style={{
                  minWidth: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <GridIconSt item sm={2}>
                  <IconButton>
                    <InfoIcon color="info" />
                  </IconButton>
                </GridIconSt>
                <GridItemPhonelSt item sm={4}>
                  {phone}
                </GridItemPhonelSt>
                <GridItemEmailSt item sm={6}>
                  {email}
                </GridItemEmailSt>
              </Grid>
              {require && <SpanRequireSt>{require}</SpanRequireSt>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const ShowInfo = ({ todayTermins }: { todayTermins: ITermin[] }) => {
  const { t } = useTranslation()
  const rows = todayTermins.map(
    ({
      _id,
      selectedSlot,
      person,
      firstName,
      lastName,
      phone,
      email,
      require,
      createdAt,
    }: ITermin) => {
      return createData({
        createdAt,
        selectedSlot,
        person,
        firstName,
        lastName,
        phone,
        email,
        require,
        _id,
      })
    }
  )

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {t("dashboard.helper.time", "Time")}
            </TableCell>
            <TableCell
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
              align="left"
            >
              {t("dashboard.helper.guest", "Guest")}
            </TableCell>
            <TableCell
              align="left"
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {t("dashboard.helper.name", "Name")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row.createdAt} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShowInfo
