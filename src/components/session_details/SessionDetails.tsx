import "./styles.scss"
import { ILogsSession } from "../../interfaces/ILogsSession"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"

interface SessionDetailsProps {
  data: ILogsSession | null
}

export default function SessionDetails({ data }: SessionDetailsProps) {
  function renderDetails() {
    return (
      <>
        <div className="session-details-items">
          <span className="title">Active Session</span>
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>{new Date(data!.start_date).toLocaleString()}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={`session-details-wrapper ${data != null ? "active-session" : ""}`}>
        {data == null ? "There is no session running" : renderDetails()}
      </div>
    </>
  )
}