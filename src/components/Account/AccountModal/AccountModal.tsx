import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"

import { TypographySt, WrapModalSt } from "../Account.css"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

interface IModalProps {
  open: boolean
  modalText: string
  handleOpen: () => void
  handleClose: () => void
}

const ChildModal: React.FC<IModalProps> = ({
  modalText,
  open,
  handleOpen,
  handleClose,
}) => {
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">{modalText}</p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

const AccountModal: React.FC<IModalProps> = ({
  modalText,
  open,
  handleOpen,
  handleClose,
}) => {
  return (
    <div>
      <WrapModalSt
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* <h2 id="parent-modal-title">Text in a modal</h2> */}
          <TypographySt id="parent-modal-description">{modalText}</TypographySt>
        </Box>
      </WrapModalSt>
    </div>
  )
}

export default AccountModal
