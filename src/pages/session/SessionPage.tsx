import { useState, useEffect, SetStateAction, Dispatch, useContext } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet, httpPost } from "../../utils/httpUtils"
import { useParams } from "react-router-dom"
import { ILogsSessionDTO } from "../../interfaces/dtos/ILogsSessionDTO"
import { IBodySensorsLogDTO } from "../../interfaces/dtos/IBodySensorsLogDTO"
import { IEnvironmentSensorsLogDTO } from "../../interfaces/dtos/IEnvironmentSensorsLogDTO"
import { ISleepwalkingEventDTO } from "../../interfaces/dtos/ISleepwalkingEventDTO"
import CalendarIcon from "../../assets/svg/icons/calendar.svg"
import ThermometerIcon from "../../assets/svg/icons/thermometer.svg"
import HumidityIcon from "../../assets/svg/icons/humidity.svg"
import HeartBeatIcon from "../../assets/svg/icons/heart_beat.svg"
import { getLocaleDateString } from "../../utils/dateUtils"
import { IChartDataset } from "../../interfaces/IChartDataset"
import { LineChart } from "../../components/charts/LineChart"
import { Button } from "@mui/material"
import { NotificationsContext } from "../../context/contexes"
import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum"

export default function SessionPage() {
  const { id } = useParams()
  let { addNotification } = useContext(NotificationsContext)

  const [isLoading, setIsLoading] = useState(true)
  const [isSessionCloseLoading, setIsSessionCloseLoading] = useState(false)

  const [session, setSession] = useState<ILogsSessionDTO | null>(null)

  const [bodySensorsLogs, setBodySensorsLogs] = useState<IBodySensorsLogDTO[] | null>(null)
  const [environmentSensorsLogs, setEnvironmentSensorsLogs] = useState<IEnvironmentSensorsLogDTO[] | null>(null)
  const [sleepwalkingEvents, setSleepwalkingEvents] = useState<ISleepwalkingEventDTO[] | null>(null)

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
        <div className="event-wrapper" key={id}>
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

  function renderSensorsMinMaxSummary() {
    const minMaxTemperature = {
      min: Math.min(...environmentSensorsLogs!.map(item => item.temperature), 0),
      max: Math.max(...environmentSensorsLogs!.map(item => item.temperature), 0),
      icon: ThermometerIcon
    }
    const minMaxHeartBeat = {
      min: Math.min(...bodySensorsLogs!.map(item => item.heart_beat), 0),
      max: Math.max(...bodySensorsLogs!.map(item => item.heart_beat), 0),
      icon: HeartBeatIcon
    }
    const minMaxHumidity = {
      min: Math.min(...environmentSensorsLogs!.map(item => item.humidity), 0),
      max: Math.max(...environmentSensorsLogs!.map(item => item.humidity), 0),
      icon: HumidityIcon
    }

    const data = [minMaxHeartBeat, minMaxTemperature, minMaxHumidity]

    return data.map((values, id) => {
      return (
        <div className="section-wrapper" key={id}>
          <div className="details-row">
            <img src={values.icon} />
            <span>Max: {values.max}</span>
          </div>
          <div className="details-row">
            <img src={values.icon} />
            <span>Min: {values.min}</span>
          </div>
        </div>
      )
    })
  }

  async function closeSession() {
    setIsSessionCloseLoading(true)

    const response = await httpPost(`/sessions/${id}/close/`)

    if (response.status == 200) {
      addNotification("Session has been closed successfully", 3000, NotificationTypeEnum.Success)
    } else {
      addNotification("Error while closing session", 3000, NotificationTypeEnum.Error)
    }

    setIsSessionCloseLoading(false)
  }

  function renderCloseButton() {
    return (
      <Button
        type="button"
        variant="contained"
        disabled={isSessionCloseLoading}
        onClick={closeSession}
      >
        Close
      </Button>
    )
  }

  function renderContent() {
    return (
      <>
        <span className="title">Session details</span>
        {session?.end_date == null ? renderCloseButton() : null}
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

        {bodySensorsLogs && environmentSensorsLogs ? renderSensorsMinMaxSummary() : null}

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
