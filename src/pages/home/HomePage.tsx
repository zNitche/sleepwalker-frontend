import { Button } from "@mui/material"
import { AuthContext } from "../../context/contexes"
import "./styles.scss"
import { useContext } from "react"


export default function HomePage() {
  let { logout } = useContext(AuthContext)

  return (
    <>
      <div className="home-page-wrapper">
        <Button onClick={() => { logout() }}>
          Logout
        </Button>
      </div>
    </>
  )
}