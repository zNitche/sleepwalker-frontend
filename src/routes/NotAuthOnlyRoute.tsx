import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/contexes'

export default function NotAuthOnlyRoute() {
  let { authToken } = useContext(AuthContext)

    return (
        authToken ? <Navigate to="/" /> : <Outlet />
    )
}
