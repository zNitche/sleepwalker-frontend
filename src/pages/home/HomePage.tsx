import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { ILogsSessionDTO } from "../../interfaces/dtos/ILogsSessionDTO"
import CurrentSessionDetails from "../../components/current_session_details/CurrentSessionDetails"
import { ILogsSessionsStatisticsDTO } from "../../interfaces/dtos/ILogsSessionsStatisticsDTO"
import SessionsStatisticsDetails from "../../components/sessions_statistics_details/SessionsStatisticsDetails"


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSession, setCurrentSession] = useState<ILogsSessionDTO | null>(null)
  const [statistics, setStatistics] = useState<ILogsSessionsStatisticsDTO | null>(null)

  useEffect(() => {
    setupData()
  }, [])

  async function getCurrentSession() {
    const response = await httpGet("/sessions/current/")

    if (response.status == 200) {
      setCurrentSession(response.data as ILogsSessionDTO)
    }
  }

  async function getSessionsStatistics() {
    const statsResponse = await httpGet("/sessions/statistics")

    if (statsResponse.status == 200) {
      setStatistics(statsResponse.data as ILogsSessionsStatisticsDTO)
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