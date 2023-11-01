import { useState, useEffect } from "react"
import { AuthContext } from "./contexes"
import { getItem, removeItem, setItem } from "../utils/localStorageUtils"

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const AUTH_TOKEN_KEY = "auth_token"

  let [authToken, setAuthToken] = useState(() => { return getItem(AUTH_TOKEN_KEY) })

  useEffect(() => {
    
  }, [])

  async function login(username: string, password: string) {
    
  }

  async function logout() {
    setAuthToken(null)
    removeItem(AUTH_TOKEN_KEY)
  }

  let contextData = {
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
