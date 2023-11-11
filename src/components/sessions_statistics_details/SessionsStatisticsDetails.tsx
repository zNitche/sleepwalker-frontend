import "./styles.scss"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import NumbersIcon from "../../assets/svg/icons/numbers.svg"
import { ILogsSessionsStatisticsDTO } from "../../interfaces/dtos/ILogsSessionsStatisticsDTO"
import { BarChart } from "../charts/BarChart"
import { IChartDataset } from "../../interfaces/IChartDataset"

interface SessionsStatisticsDetailsProps {
  data: ILogsSessionsStatisticsDTO
}

export default function SessionsStatisticsDetails({ data }: SessionsStatisticsDetailsProps) {
  function renderDate(dateString: string) {
    return dateString ? new Date(dateString).toLocaleString() : "-"
  }

  function renderEventsChart() {
    const labels: string[] = []
    const values: number[] = []

    for (let date in data.sleepwalking_events) {
      labels.push(date.split("T")[0])
      values.push(data.sleepwalking_events[date])
    }

    const dataset: IChartDataset = {
      label: "sleepwalking events",
      data: values,
      backgroundColor: "#fff"
    }

    return (
      <div className="statistics-chart-wrapper">
        <BarChart labels={labels} datasets={[dataset]} />
      </div>
    )
  }

  return (
    <>
      <div className="sessions-statistics-details-wrapper">
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