import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { ILogsSession } from "../../interfaces/ILogsSession"
import CurrentSessionDetails from "../../components/current_session_details/CurrentSessionDetails"
import { ILogsSessionsStatistics } from "../../interfaces/ILogsSessionsStatistics"
import SessionsStatisticsDetails from "../../components/sessions_statistics_details/SessionsStatisticsDetails"


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSession, setCurrentSession] = useState<ILogsSession | null>(null)
  const [statistics, setStatistics] = useState<ILogsSessionsStatistics | null>(null)

  useEffect(() => {
    setupData()
  }, [])

  async function getCurrentSession() {
    const response = await httpGet("/sessions/current/")

    if (response.status == 200) {
      setCurrentSession(response.data as ILogsSession)
    }
  }

  async function getSessionsStatistics() {
    const statsResponse = await httpGet("/sessions/statistics")

    if (statsResponse.status == 200) {
      setStatistics(statsResponse.data as ILogsSessionsStatistics)
    }
  }

  async function setupData() {
    setIsLoading(true)

    await getCurrentSession()
    await getSessionsStatistics()

    setIsLoading(false)
  }

  function renderContent() {
    return (
      <>
        <CurrentSessionDetails data={currentSession} />
        {statistics != null ? <SessionsStatisticsDetails data={statistics} /> : null}
      </>
    )
  }

  return (
    <div className="home-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}