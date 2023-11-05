import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import RouterProvider from "./router"
import "./styles/styles.scss"
import NotificationsProvider from "./context/NotificationsProvider"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <RouterProvider />
            </LocalizationProvider>
          </NotificationsProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
