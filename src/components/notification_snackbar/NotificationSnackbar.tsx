import { useEffect } from "react";
import "./styles.scss";
import CloseIcon from "../../assets/svg/icons/close.svg";
import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum";

interface NotificationSnackbarProps {
  message: string
  autoHideDuration: number
  type: NotificationTypeEnum
  handleClose: () => void
}

export default function NotificationSnackbar({ message, autoHideDuration, type, handleClose }: NotificationSnackbarProps) {
  useEffect(() => {
    setTimeout(function () { handleClose() }, autoHideDuration);
  }, [])

  return (
    <div className={`notification-snackbar ${type}-notification`}>
      <div className="content">
        {message}
      </div>
      <div className="actions">
        <img src={CloseIcon} onClick={handleClose} />
      </div>
    </div>
  )
}
