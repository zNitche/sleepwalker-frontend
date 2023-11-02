import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum";

export interface INotificationsContext {
  addNotification: (message: string, expiration: number, type: NotificationTypeEnum) => void
}
