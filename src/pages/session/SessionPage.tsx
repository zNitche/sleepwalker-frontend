import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { useParams } from "react-router-dom"
import { ILogsSession } from "../../interfaces/ILogsSession"

export default function SessionPage() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<ILogsSession | null>(null)

  useEffect(() => {
    setupData()
  }, [])

  async function setupData() {
    setIsLoading(true)

    const response = await httpGet(`/sessions/${id}`)

    if (response.status == 200) {
      setSession(response.data)
    }

    setIsLoading(false)
  }

  function renderContent() {
    return (
      <>
        Session: {session?.uuid}
      </>
    )
  }

  return (
    <div className="session-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
