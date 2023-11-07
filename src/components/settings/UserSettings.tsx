import { useState, useEffect, useContext, Dispatch, SetStateAction, ChangeEvent } from "react"
import { Button, TextField } from "@mui/material"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet, httpPut } from "../../utils/httpUtils"
import { NotificationsContext } from "../../context/contexes"
import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum"

interface UserSettingsProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function UserSettings({ setIsLoading }: UserSettingsProps) {
  let { addNotification } = useContext(NotificationsContext)

  const [isSavingInProgress, setIsSavingInProgress] = useState(false)
  const [hbPercentageThreshold, setHbPercentageThreshold] = useState(0)

  useEffect(() => {
    setupData()
  }, [])

  async function setupData() {
    setIsLoading(true)

    const response = await httpGet("/auth/user/settings/")

    if (response.status == 200) {
      setHbPercentageThreshold(response.data.sw_detection_heart_beat_percentage_threshold)
    }

    setIsLoading(false)
  }

  function onInputNumberValueChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, valueSetter: Dispatch<SetStateAction<number>>) {
    const value = parseInt(event.target.value)
    valueSetter(!isNaN(value) ? value : 0)
  }

  async function saveUserSettings() {
    setIsSavingInProgress(true)

    const response = await httpPut("/auth/user/settings/", {
      "sw_detection_heart_beat_percentage_threshold": hbPercentageThreshold
    })

    if (response.status == 200) {
      addNotification("Successfully saved user settings", 2000, NotificationTypeEnum.Success)
    } else {
      addNotification("Error while saving user settings", 2000, NotificationTypeEnum.Error)
    }

    setIsSavingInProgress(false)
  }

  return (
    <div className="settings-section-wrapper">
      <span className="title">User Settings</span>
      <span className="sub-title">Heart beat percentage threshold</span>
      <div className="content">
        <TextField
          type={"number"}
          onChange={(event) => { onInputNumberValueChanged(event, setHbPercentageThreshold) }}
          value={hbPercentageThreshold}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSavingInProgress}
          onClick={saveUserSettings}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
