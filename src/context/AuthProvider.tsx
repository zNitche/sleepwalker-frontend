import { useState, useEffect } from "react"
import { AuthContext } from "./contexes"
import { getAuthToken, removeAuthToken, setAuthToken } from "../utils/authUtils"
import { httpPost } from "../utils/httpUtils"

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  let [authToken, setAuthTokenValue] = useState(() => { return getAuthToken() })

  useEffect(() => {
    
  }, [])

  async function login(username: string, password: string) {
    const response = await httpPost("/auth/login/", {
      username: username,
      password: password
    }, true)

    if (response.status == 200) {
      const token = response.data.token
      setAuthTokenValue(token)
      setAuthToken(token)

      return true
    } else {
      return false
    }
  }

  async function logout() {
    httpPost("/auth/logout/")

    setAuthTokenValue("")
    removeAuthToken()
  }

  const contextData = {
    authToken: authToken,
    login: login,
    logout: logout
  }

  return (
    <AuthContext.Provider value={contextData} >
      {children}
    </AuthContext.Provider>
  )
}
