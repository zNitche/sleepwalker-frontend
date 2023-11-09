import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import NotAuthOnlyRoute from './routes/NotAuthOnlyRoute'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import NotFoundPage from './pages/not_found/NotFoundPage'
import PageLayout from './pages/page_layout/PageLayout'
import SettingsPage from './pages/settings/SettingsPage'
import SessionsPage from './pages/sessions/SessionsPage'
import SessionPage from './pages/session/SessionPage'

export default function RouterProvider() {
  function privateRoutes() {
    return (
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"/settings"} element={<SettingsPage />} />
        <Route path={"/sessions"} element={<SessionsPage />} />
        <Route path={"/sessions/:id"} element={<SessionPage />} />
      </Route>
    )
  }

  function publicRoutes() {
    return (
      <>

      </>
    )
  }

  function nonAuthOnlyRoutes() {
    return (
      <>
        <Route path="/login" element={<LoginPage />} />
      </>
    )
  }

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {privateRoutes()}
      </Route>
      {publicRoutes()}
      <Route element={<NotAuthOnlyRoute />}>
        {nonAuthOnlyRoutes()}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
