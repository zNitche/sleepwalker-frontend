import { Outlet } from "react-router-dom"
import "./styles.scss"

export default function PageLayout() {
  return (
    <>
      <div className="page-layout-wrapper">
        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}
