import { ILogsSession } from "../../interfaces/ILogsSession"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import { Link } from "react-router-dom"

interface CurrentSessionDetailsProps {
  data: ILogsSession | null
}

export default function SessionDetails({ data }: CurrentSessionDetailsProps) {
  function renderDetails() {
    return (
      <>
        <div className="session-details-items">
          <span className="title">Session {data?.uuid}</span>
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>Start: {new Date(data!.start_date).toLocaleString()}</span>
          </div>
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>End: {new Date(data!.end_date).toLocaleString()}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="session-details-wrapper available-session">
      <Link to={`/sessions/${data?.uuid}`}>
        {renderDetails()}
      </Link>
    </div>
  )
}