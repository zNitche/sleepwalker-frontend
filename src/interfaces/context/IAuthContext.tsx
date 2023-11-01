export interface IAuthContext {
  authToken: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}
