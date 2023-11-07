import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Button, TextField } from "@mui/material"
import "./styles.scss"
import { httpGet, httpPost } from "../../utils/httpUtils"

interface ApiKeySettingsProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function ApiKeySettings({ setIsLoading }: ApiKeySettingsProps) {
  const [isSavingInProgress, setIsSavingInProgress] = useState(false)
  const [apiKey, setApiKey] = useState<string>("")

  useEffect(() => {
    setupData()
  }, [])

  async function setupData() {
    setIsLoading(true)

    const response = await httpGet("/auth/api-key/")

    if (response.status == 200) {
      setApiKey(response.data.api_key)
    }

    setIsLoading(false)
  }

  async function generateApiKey() {
    setIsSavingInProgress(true)

    const response = await httpPost("/auth/api-key/")

    if (response.status == 200) {
      setApiKey(response.data.api_key)
    }

    setIsSavingInProgress(false)
  }

  return (
    <div className="settings-section-wrapper">
      <div className="title">API Key Management</div>
      <div className="content">
        <TextField
          disabled
          value={apiKey}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSavingInProgress}
          onClick={generateApiKey}
        >
          Generate
        </Button>
      </div>
    </div>
  )
}
