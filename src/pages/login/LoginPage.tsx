import { Button, TextField } from "@mui/material"
import { AuthContext, NotificationsContext } from "../../context/contexes"
import "./styles.scss"
import { useContext, useState } from "react"
import SleepwalkerLogo from "../../assets/svg/sleepwalker_logo.svg"
import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum"


export default function LoginPage() {
  let { login } = useContext(AuthContext)
  let { addNotification } = useContext(NotificationsContext)

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: any) {
    event.preventDefault()
    setLoading(true)

    const username = event.target.username.value
    const password = event.target.password.value

    const success = await login(username, password)

    if (!success) {
      addNotification("error while logging in", 2000, NotificationTypeEnum.Error)
    }

    setLoading(false)
  }

  return (
    <>
      <div className="login-page-wrapper">
        <div className="login-panel-wrapper">
          <div className="logo-wrapper">
            <img src={SleepwalkerLogo} />
            <span className="title">Sleepwalker Dashboard</span>
          </div>
          <form className="login-form-wrapper" onSubmit={handleLogin}>
            <TextField
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
            <Button
              type="submit"
              className="login-btn"
              variant="contained"
              disabled={loading}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}