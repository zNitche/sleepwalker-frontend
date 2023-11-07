import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import ApiKeySettings from "../../components/settings/ApiKeySettings"
import UserSettings from "../../components/settings/UserSettings"


export default function SettingsPage() {
  const [settingsReady, setSettingsReady] = useState(false)

  const [apiKeySettingsLoading, setApiKeySettingsLoading] = useState(true)
  const [userSettingsLoading, setUserSettingsLoading] = useState(true)

  useEffect(() => {
    setSettingsReady((!apiKeySettingsLoading && !userSettingsLoading))

  }, [apiKeySettingsLoading, userSettingsLoading])

  return (
    <>
      {!settingsReady ? <FlexLoader /> : null}
      <div className={`settings-page-wrapper ${!settingsReady ? "d-none" : ""}`}>
        {<ApiKeySettings setIsLoading={setApiKeySettingsLoading} />}
        {<UserSettings setIsLoading={setUserSettingsLoading} />}
      </div>
    </>
  )
}
