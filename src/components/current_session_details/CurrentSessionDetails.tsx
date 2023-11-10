import { ILogsSession } from "../../interfaces/ILogsSession"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import { useNavigate } from "react-router-dom"
import { getLocaleDateString } from "../../utils/dateUtils"

interface CurrentSessionDetailsProps {
  data: ILogsSession | null
}

export default function CurrentSessionDetails({ data }: CurrentSessionDetailsProps) {
  const navigate = useNavigate()

  function renderDetails() {
    return (
      <>
        <div className="session-details-items">
          <span className="title">Active Session</span>
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>{getLocaleDateString(data!.start_date)}</span>
          </div>
        </div>
      </>
    )
  }

  function navigateToSession() {
    if (data) {
      navigate(`/sessions/${data?.uuid}`)
    }
  }

  return (
    <div onClick={navigateToSession} className={`session-details-wrapper ${data != null ? "available-session" : ""}`}>
      {data == null ? "There is no session running" : renderDetails()}
    </div>
  )
}
