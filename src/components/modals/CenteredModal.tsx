import { ReactElement, Dispatch, SetStateAction } from "react"
import "./styles.scss"
import { Modal } from "@mui/material"
import CloseIcon from "../../assets/svg/icons/close.svg"

interface CenteredModalProps {
  title: string
  children: ReactElement
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onCloseCallback?: () => void
}

export default function CenteredModal({ title, children, isOpen, setIsOpen, onCloseCallback }: CenteredModalProps) {
  function handleClose() {
    if (onCloseCallback != undefined) {
      onCloseCallback()
    }

    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div className="modal-wrapper">
        <div className="title mb-2">
          {title}
          <img src={CloseIcon} onClick={handleClose} />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </Modal>
  )
}
