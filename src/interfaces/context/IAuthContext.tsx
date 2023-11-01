export interface IAuthContext {
  authToken: string | null
  login: (username: string, password: string) => void
  logout: () => void
}
