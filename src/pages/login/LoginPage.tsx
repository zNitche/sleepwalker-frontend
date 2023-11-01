import { Button, TextField } from "@mui/material"
import { AuthContext } from "../../context/contexes"
import "./styles.scss"
import { useContext } from "react"


export default function LoginPage() {
  let { login } = useContext(AuthContext)

  async function handleLogin(event: any) {
    event.preventDefault()

    const username = event.target!.username.value
    const password = event.target!.password.value

    await login(username, password)
  }

  return (
    <>
      <div className="login-page-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
            <TextField
              name="username"
              type="text"
              placeholder="Login"
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              fullWidth
            />
            <Button type="submit" className="login-btn" variant="contained">
              Sign In
            </Button>
        </form>
      </div>
    </>
  )
}