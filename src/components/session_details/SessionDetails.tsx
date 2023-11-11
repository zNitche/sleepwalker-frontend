import { ILogsSessionDTO } from "../../interfaces/dtos/ILogsSessionDTO"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import { Link } from "react-router-dom"
import { getLocaleDateString } from "../../utils/dateUtils"

interface CurrentSessionDetailsProps {
  data: ILogsSessionDTO | null
}

export default function SessionDetails({ data }: CurrentSessionDetailsProps) {
  function renderDetails() {
    return (
      <>
        <div className="session-details-items">
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>Start: {getLocaleDateString(data!.start_date)}</span>
          </div>
          <div className="session-details-item">
            <img src={CalendarIcon} />
            <span>End: {getLocaleDateString(data!.end_date)}</span>
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
