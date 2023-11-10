import { useState, useEffect, SetStateAction, Dispatch } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"
import { useParams } from "react-router-dom"
import { ILogsSession } from "../../interfaces/ILogsSession"
import { IBodySensorsLog } from "../../interfaces/IBodySensorsLog"
import { IEnvironmentSensorsLog } from "../../interfaces/IEnvironmentSensorsLog"
import { ISleepwalkingEvent } from "../../interfaces/ISleepwalkingEvent"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import { getLocaleDateString } from "../../utils/dateUtils"
import { IChartDataset } from "../../interfaces/IChartDataset"
import { LineChart } from "../../components/charts/LineChart"

export default function SessionPage() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<ILogsSession | null>(null)

  const [bodySensorsLogs, setBodySensorsLogs] = useState<IBodySensorsLog[] | null>(null)
  const [environmentSensorsLogs, setEnvironmentSensorsLogs] = useState<IEnvironmentSensorsLog[] | null>(null)
  const [sleepwalkingEvents, setSleepwalkingEvents] = useState<ISleepwalkingEvent[] | null>(null)

  useEffect(() => {
    getSessionData()
  }, [])

  useEffect(() => {
    if (session) {
      getLogsData(setBodySensorsLogs, `/sessions/${id}/body-sensors`)
      getLogsData(setEnvironmentSensorsLogs, `/sessions/${id}/environment-sensors`)
      getLogsData(setSleepwalkingEvents, `/sessions/${id}/sleepwalking-events`)
    }
  }, [session])

  async function getSessionData() {
    setIsLoading(true)

    const response = await httpGet(`/sessions/${id}`)

    if (response.status == 200) {
      setSession(response.data)

      setIsLoading(false)
    }
  }


  async function getLogsData(setter: SetStateAction<Dispatch<any[]>>, url: string) {
    const response = await httpGet(url)

    if (response.status == 200) {
      setter(response.data)
    }
  }

  function renderHeartBeatChart() {
    const labels: string[] = []
    const heartBeatValues: number[] = []

    for (let row of bodySensorsLogs!) {
      const date = new Date(row.date)
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      const seconds = date.getSeconds().toString().padStart(2, "0")

      labels.push(`${hours}:${minutes}:${seconds}`)
      heartBeatValues.push(row.heart_beat)
    }

    const dataset: IChartDataset = { label: "heart beat", data: heartBeatValues, backgroundColor: "#ff0000", borderColor: "#ff0000" }

    return renderLineChart(labels, [dataset], 50)
  }

  function renderAccelerationChart() {
    const datasets: IChartDataset[] = []

    const labels: string[] = []
    const accelerationXValues: number[] = []
    const accelerationYValues: number[] = []
    const accelerationZValues: number[] = []

    for (let row of bodySensorsLogs!) {
      const date = new Date(row.date)

      labels.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      accelerationXValues.push(row.acceleration_x)
      accelerationYValues.push(row.acceleration_y)
      accelerationZValues.push(row.acceleration_z)
    }

    datasets.push({ label: "acceleration X", data: accelerationXValues, backgroundColor: "#fff", borderColor: "#fff" })
    datasets.push({ label: "acceleration Y", data: accelerationYValues, backgroundColor: "#999999", borderColor: "#999999" })
    datasets.push({ label: "acceleration Z", data: accelerationZValues, backgroundColor: "#4d4d4d", borderColor: "#4d4d4d" })

    return renderLineChart(labels, datasets, 2)
  }

  function renderEnvSensorsChart() {
    const labels: string[] = []
    const temperatureValues: number[] = []
    const humidityValues: number[] = []

    for (let row of environmentSensorsLogs!) {
      const date = new Date(row.date)

      labels.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      temperatureValues.push(row.temperature)
      humidityValues.push(row.humidity)
    }

    const temperatureDataset: IChartDataset = { label: "temperature", data: temperatureValues, backgroundColor: "#fff", borderColor: "#fff" }
    const humidityDataset: IChartDataset = { label: "humidity", data: humidityValues, backgroundColor: "#4d4d4d", borderColor: "#4d4d4d" }

    return (
      <>
      {renderLineChart(labels, [temperatureDataset], 10)}
      {renderLineChart(labels, [humidityDataset], 10)}
      </>
    )
  }

  function renderLineChart(labels: string[], datasets: IChartDataset[], stepSizeY: number) {
    const chartWidth = 5 * labels.length

    return (
      <div className="chart-container">
        <div className="chart-wrapper" style={{ width: chartWidth < 300 ? "100%" : `${chartWidth}px` }}>
          <LineChart labels={labels} datasets={datasets} stepSizeY={stepSizeY} />
        </div>
      </div>
    )
  }

  function renderSleepwalkingEvents() {
    return sleepwalkingEvents?.map((e, id) => {
      return (
        <div className="event-wrapper">
           <div className="details-row">
            <img src={CalendarIcon} />
            <span>Start: {getLocaleDateString(e.start_date)}</span>
          </div>
          <div className="details-row">
            <img src={CalendarIcon} />
            <span>End: {getLocaleDateString(e.end_date)}</span>
          </div>
        </div>
      )
    })
  }

  function renderContent() {
    return (
      <>
        <span className="title">Session</span>
        <div className="section-wrapper">
          <div className="details-row">
            <img src={CalendarIcon} />
            <span>Start: {getLocaleDateString(session!.start_date)}</span>
          </div>
          <div className="details-row">
            <img src={CalendarIcon} />
            <span>End: {getLocaleDateString(session!.end_date)}</span>
          </div>
        </div>

        <div className="section-wrapper">
          <span className="section-title">Heart beat</span>
          {bodySensorsLogs ? renderHeartBeatChart() : <FlexLoader />}
        </div>

        <div className="section-wrapper">
          <span className="section-title">Acceleration</span>
          {bodySensorsLogs ? renderAccelerationChart() : <FlexLoader />}
        </div>

        <div className="section-wrapper">
          <span className="section-title">Environment sensors logs</span>
          {environmentSensorsLogs ? renderEnvSensorsChart() : <FlexLoader />}
        </div>

        <div className="section-wrapper">
          <span className="section-title">{sleepwalkingEvents?.length} Sleepwalking events</span>
          {sleepwalkingEvents ? renderSleepwalkingEvents() : <FlexLoader />}
        </div>
      </>
    )
  }

  return (
    <div className="session-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
