import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { ILogsSession } from "../../interfaces/ILogsSession"
import SessionDetails from "../../components/session_details/SessionDetails"
import { ILogsSessionsStatistics } from "../../interfaces/ILogsSessionsStatistics"
import SessionStatisticsDetails from "../../components/session_statistics_details/SessionStatisticsDetails"


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSession, setCurrentSession] = useState<ILogsSession | null>(null)
  const [statistics, setStatistics] = useState<ILogsSessionsStatistics | null>(null)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    setIsLoading(true)

    const response = await httpGet("/sessions/current/")

    if (response.status == 200) {
      setCurrentSession(response.data as ILogsSession)
    }

    const statsResponse = await httpGet("/sessions/statistics")

    if (statsResponse.status == 200) {
      setStatistics(statsResponse.data as ILogsSessionsStatistics)
    }

    setIsLoading(false)
  }

  function renderContent() {
    return (
      <>
        <SessionDetails data={currentSession} />
        {statistics != null ? <SessionStatisticsDetails data={statistics} /> : null}
      </>
    )
  }

  return (
    <div className="home-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}