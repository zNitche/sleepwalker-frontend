import { NavLink } from "react-router-dom"
import "./styles.scss"


export default function NotFoundPage() {
  return (
    <div className="not-found-wrapper">
      Page not found
      <NavLink to={"/"}>
        Take me home
      </NavLink>
    </div>
  )
}