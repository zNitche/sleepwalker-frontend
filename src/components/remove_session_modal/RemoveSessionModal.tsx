import { Dispatch, SetStateAction, useState } from "react"
import "./styles.scss"
import CenteredModal from "../modals/CenteredModal"
import { Button } from "@mui/material"

interface RemoveSessionModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  sessionId: string | undefined
  deletionCallback: () => Promise<void>
}

export default function RemoveSessionModal({ isOpen, setIsOpen, sessionId, deletionCallback }: RemoveSessionModalProps) {
  const [processing, setIsProcessing] = useState(false)

  async function removeSession() {
    setIsProcessing(true)

    await deletionCallback()

    setIsProcessing(false)
    setIsOpen(false)
  }

  return (
    <>
      <CenteredModal title={"Remove session"} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="remove-session-modal-wrapper">
          <div>Do you want to remove this session: <b>{sessionId}</b> ?</div>
          <Button
            className="remove-btn"
            variant="contained"
            disabled={processing}
            onClick={removeSession}
          >
            Remove
          </Button>
          <Button
            className="cancel-btn"
            variant="contained"
            disabled={processing}
            onClick={() => { setIsOpen(false) }}
          >
            Cancel
          </Button>
        </div>
      </CenteredModal>
    </>
  )
}
