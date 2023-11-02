import { NotificationTypeEnum } from "../enums/NotificationTypeEnum"

export interface INotification {
  id: string
  message: string
  expiration: number
  type: NotificationTypeEnum
}
