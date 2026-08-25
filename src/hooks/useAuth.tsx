import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { api } from '../lib/api'

export interface User {
  id: number
  uuid: string
  email: string
  name: string | null
  role: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await api.get<{ user: User }>('/api/auth/session')
      setUser(res.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post<{ user: User }>('/api/auth/login', { email, password })
    setUser(res.user)
  }

  const signup = async (email: string, password: string, name?: string) => {
    const res = await api.post<{ user: User }>('/api/auth/signup', { email, password, name })
    setUser(res.user)
  }

  const logout = async () => {
    await api.post('/api/auth/logout', {})
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      refresh: fetchUser,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
