import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import RouterProvider from "./router"
import "./styles/styles.scss"
import NotificationsProvider from "./context/NotificationsProvider"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider>
            <RouterProvider />
          </NotificationsProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
