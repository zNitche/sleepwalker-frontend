import { useState, useEffect, useContext } from "react"
import { Button, TextField } from "@mui/material"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet, httpPost, httpPut } from "../../utils/httpUtils"
import { NotificationsContext } from "../../context/contexes"
import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum"


export default function SettingsPage() {
  let { addNotification } = useContext(NotificationsContext)

  const [isLoading, setIsLoading] = useState(true)
  const [apiKeySettingsLoading, setApiKeySettingsLoading] = useState(false)
  const [userSettingsLoading, setUserSettingsLoading] = useState(false)

  const [apiKey, setApiKey] = useState<string | null>(null)
  const [hbPercentageThreshold, setHbPErcentageThreshold] = useState(0)

  useEffect(() => {
    setupData()
  }, [])

  async function getApiKey() {
    const response = await httpGet("/auth/api-key/")

    if (response.status == 200) {
      setApiKey(response.data.api_key)
    }
  }

  async function setupData() {
    setIsLoading(true)

    await getApiKey()

    setIsLoading(false)
  }

  async function generateApiKey() {
    setApiKeySettingsLoading(true)

    const response = await httpPost("/auth/api-key/")

    if (response.status == 200) {
      setApiKey(response.data.api_key)
    }

    setApiKeySettingsLoading(false)
  }

  function renderApiKeySettings() {
    return (
      <div className="section-wrapper">
        <div className="title">API Key Management</div>
        <div className="content api-key-wrapper">
          <TextField
            disabled
            value={apiKey}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={apiKeySettingsLoading}
            onClick={generateApiKey}
          >Generate</Button>
        </div>
      </div>
    )
  }

  async function saveUserSettings() {
    setUserSettingsLoading(true)

    const response = await httpPut("/auth/user/settings/", {
      "sw_detection_heart_beat_percentage_threshold": hbPercentageThreshold
    })

    if (response.status == 200) {
      addNotification("Successfully saved user settings", 2000, NotificationTypeEnum.Success)
    } else {
      addNotification("Error while saving user settings", 2000, NotificationTypeEnum.Error)
    }

    setUserSettingsLoading(false)
  }

  function renderUserSettings() {
    return (
      <div className="section-wrapper">
        <div className="title">User Settings</div>
        <div className="content api-key-wrapper">
          <TextField
            onChange={ (event) => {setHbPErcentageThreshold(event.target.value)}}
            value={hbPercentageThreshold}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={userSettingsLoading}
            onClick={saveUserSettings}
          >Save</Button>
        </div>
      </div>
    )
  }

  function renderContent() {
    return (
      <>
        {renderApiKeySettings()}
        {renderUserSettings()}
      </>
    )
  }

  return (
    <div className="settings-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
