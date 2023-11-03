import "./styles.scss"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import NumbersIcon from "../../assets/svg/icons/numbers.svg"
import { ILogsSessionsStatistics } from "../../interfaces/ILogsSessionsStatistics"

interface SessionStatisticsDetailsProps {
  data: ILogsSessionsStatistics
}

export default function SessionStatisticsDetails({ data }: SessionStatisticsDetailsProps) {
  function renderDate(dateString: string) {
    if (dateString) {
      return new Date(dateString).toLocaleString()
    } else {
      return ("-")
    }
  }

  function renderEventsChart() {
    return (
      <div className="">
        
      </div>
    )
  }

  return (
    <>
      <div className="session-statistics-details-wrapper">
        <span className="title">Sessions Statistics</span>
        <div className="item-wrapper">
          <img src={NumbersIcon} />
          <div>Sessions Count:</div>
          <div className="item-value">{data.logs_sessions}</div>
        </div>
        <div className="item-wrapper">
          <img src={NumbersIcon} />
          <div>Sleepwalking Events Count:</div>
          <div className="item-value">{data.sleepwalking_events_count}</div>
        </div>
        <div className="item-wrapper">
          <img src={CalendarIcon} />
          <div>Last Session Start:</div>
          <div className="item-value">{renderDate(data.last_session_start_date)}</div>
        </div>
        <div className="item-wrapper">
          <img src={CalendarIcon} />
          <div>Last Session End:</div>
          <div className="item-value">{renderDate(data.last_session_end_date)}</div>
        </div>
        <div className="item-wrapper">
          <img src={CalendarIcon} />
          <div>First Session Start:</div>
          <div className="item-value">{renderDate(data.first_session_start_date)}</div>
        </div>
        <div className="item-wrapper">
          <img src={CalendarIcon} />
          <div>First Session End:</div>
          <div className="item-value">{renderDate(data.first_session_end_date)}</div>
        </div>
      </div>
      {renderEventsChart()}
    </>
  )
}