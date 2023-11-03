import { Outlet } from "react-router-dom"
import "./styles.scss"
import NavPanel from "../../components/nav_panel/NavPanel"

export default function PageLayout() {
  return (
    <>
      <div className="page-wrapper">
        <NavPanel />
        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}
