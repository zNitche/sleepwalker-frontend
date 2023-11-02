import { ReactElement, useState } from "react";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import { NotificationsContext } from "./contexes";
import { INotification } from "../interfaces/INotification";
import NotificationSnackbar from "../components/notification_snackbar/NotificationSnackbar";

interface NotificationsProvider {
  children: ReactElement
}

export default function NotificationsProvider({ children }: NotificationsProvider) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  function addNotification(message: string, expiration: number, type: NotificationTypeEnum) {
    const notification = {
      id: crypto.randomUUID(),
      message: message,
      expiration: expiration,
      type: type ? type : NotificationTypeEnum.Success,
    }

    setNotifications(notifications => [...notifications, notification])
  }

  function removeNotification(id: string) {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id)
    )
  }

  const contextData = {
    addNotification: addNotification
  }

  function renderNotifications() {
    return notifications.map((notification) => (
      <NotificationSnackbar
        key={notification.id}
        message={notification.message}
        autoHideDuration={notification.expiration}
        type={notification.type}
        handleClose={() => { removeNotification(notification.id) }}
      />
    ))
  }

  return (
    <NotificationsContext.Provider value={contextData} >
      {children}

      <div className="notifications-wrapper">
        {renderNotifications()}
      </div>
    </NotificationsContext.Provider>
  )
}