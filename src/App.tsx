import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import RouterProvider from "./router"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
