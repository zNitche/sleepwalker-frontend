import "./styles.scss"
import { ILogsSession } from "../../interfaces/ILogsSession"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"

interface CurrentSessionDetailsProps {
  data: ILogsSession | null
}

export default function CurrentSessionDetails({ data }: CurrentSessionDetailsProps) {
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
    <div className={`current-session-details-wrapper ${data != null ? "active-session" : ""}`}>
      {data == null ? "There is no session running" : renderDetails()}
    </div>
  )
}