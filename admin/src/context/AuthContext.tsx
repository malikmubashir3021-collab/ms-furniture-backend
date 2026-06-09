import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { api } from '../api'

interface AuthState {
  token: string
  username: string
}

interface AuthContextType {
  user: AuthState | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token && username) {
      setUser({ token, username })
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
