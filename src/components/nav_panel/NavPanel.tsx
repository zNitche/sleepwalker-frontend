import { useContext } from "react"
import { AuthContext } from "../../context/contexes"
import { NavLink } from "react-router-dom"
import "./styles.scss"
import LogoutIcon from "../../assets/svg/icons/logout.svg"
import SleepWalkerLogo from "../../assets/svg/sleepwalker_logo.svg"
import HomeIcon from "../../assets/svg/icons/home.svg"
import DataIcon from "../../assets/svg/icons/data.svg"
import SettingsIcon from "../../assets/svg/icons/settings.svg"

export default function NavPanel() {
  let { logout } = useContext(AuthContext)

  return (
    <div className="nav-panel-wrapper">
      <img className="logo" src={SleepWalkerLogo} />
      <NavLink className="nav-item" to={"/"}>
        <img src={HomeIcon} />
      </NavLink>
      <NavLink className="nav-item" to={"/sessions"}>
        <img src={DataIcon} />
      </NavLink>
      <NavLink className="nav-item" to={"/settings"}>
        <img src={SettingsIcon} />
      </NavLink>
      <div className="nav-item logout">
        <img src={LogoutIcon} onClick={() => { logout() }} />
      </div>
    </div>
  )
}
