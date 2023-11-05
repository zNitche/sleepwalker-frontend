import { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet, httpPost } from "../../utils/httpUtils"


export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [apiKeyLoading, setApiKeyLoading] = useState(false)

  const [apiKey, setApiKey] = useState<string | null>(null)

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
    setApiKeyLoading(true)

    const response = await httpPost("/auth/api-key/")

    if (response.status == 200) {
      setApiKey(response.data.api_key)
    }

    setApiKeyLoading(false)
  }

  function renderContent() {
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
            disabled={apiKeyLoading}
            onClick={generateApiKey}
          >Generate</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="settings-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
