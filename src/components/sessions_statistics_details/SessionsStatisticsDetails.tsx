import "./styles.scss"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import NumbersIcon from "../../assets/svg/icons/numbers.svg"
import { ILogsSessionsStatistics } from "../../interfaces/ILogsSessionsStatistics"
import { BarChart } from "../bar_chart/BarChart"
import { IChartDataset } from "../../interfaces/IChartDataset"

interface SessionsStatisticsDetailsProps {
  data: ILogsSessionsStatistics
}

export default function SessionsStatisticsDetails({ data }: SessionsStatisticsDetailsProps) {
  function renderDate(dateString: string) {
    return dateString ? new Date(dateString).toLocaleString() : "-"
  }

  function renderEventsChart() {
    const labels: string[] = []
    const values: number[] = []

    for (let date in data.sleepwalking_events) {
      const dateObj = new Date(date)
      const dateString = `${dateObj.getDay() + 1}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`

      labels.push(dateString)
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