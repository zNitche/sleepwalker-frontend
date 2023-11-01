import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/contexes'


export default function PrivateRoute() {
  let { authToken } = useContext(AuthContext)

    return (
        authToken ? <Outlet /> : <Navigate to="/login" />
    )
}
