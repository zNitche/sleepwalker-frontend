import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { ILogsSessionDTO } from "../../interfaces/dtos/ILogsSessionDTO"
import PrevIcon from "../../assets/svg/icons/arrow_back.svg"
import NextIcon from "../../assets/svg/icons/arrow_forward.svg"
import SessionDetails from "../../components/session_details/SessionDetails"
import { useSearchParams } from "react-router-dom"


export default function SessionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState<ILogsSessionDTO[]>([])

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [prevPageExists, setPrevPageExists] = useState<string | null>(null)
  const [nextPageExists, setNextPageExists] = useState<string | null>(null)

  useEffect(() => {
    updatePageNumber()
  }, [])

  useEffect(() => {
    if (currentPage > 0) {
      setupData()
    }
  }, [currentPage])

  async function setupData() {
    setIsLoading(true)

    const response = await httpGet("/sessions", { "page": currentPage.toString() })

    if (response.status == 200) {
      setPrevPageExists(response.data.pagination.previous)
      setNextPageExists(response.data.pagination.next)

      setSessions(response.data.data)
    }

    setIsLoading(false)
  }

  function updatePageNumber() {
    const pageIdParam = searchParams.get("page")
    const pageId = pageIdParam ? parseInt(pageIdParam) : 1
    setCurrentPageHandler(pageId)
  }

  function setCurrentPageHandler(pageId: number) {
    setCurrentPage(pageId)
    setSearchParams({ "page": pageId.toString() })
  }

  function renderSessions() {
    return sessions.map((session, id) => {
      return <SessionDetails data={session} key={id} />
    })
  }

  function nextPage() {
    if (nextPageExists) {
      setCurrentPageHandler(currentPage + 1)
    }
  }

  function prevPage() {
    if (prevPageExists) {
      setCurrentPageHandler(currentPage - 1)
    }
  }

  function renderContent() {
    return (
      <>
        {renderSessions()}
        <div className="pagination-nav-wrapper">
          {prevPageExists ? <img src={PrevIcon} onClick={prevPage} /> : null}
          {nextPageExists ? <img className="next-page-nav" src={NextIcon} onClick={nextPage} /> : null}
        </div>
      </>
    )
  }

  return (
    <div className="sessions-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
