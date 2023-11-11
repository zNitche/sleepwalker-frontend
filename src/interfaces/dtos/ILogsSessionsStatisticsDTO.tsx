export interface ILogsSessionsStatisticsDTO {
  logs_sessions: number
  first_session_start_date: string
  last_session_start_date: string
  first_session_end_date: string
  last_session_end_date: string
  sleepwalking_events_count: number
  sleepwalking_events: Record<string, number>
}
