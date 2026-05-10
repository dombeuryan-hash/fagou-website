import { createContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export interface AuthUser {
  name: string
  email: string
  role: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<string | null>
  logout: () => Promise<void>
  isAuthenticated: boolean
  loading: boolean
}

const ADMIN_PROFILES: Record<string, { name: string; role: string }> = {
  'trading@fagou.be':    { name: 'Admin FAGOU',       role: 'Super Admin' },
  'commercial@fagou.be': { name: 'Commercial Manager', role: 'Commercial' },
  'export@fagou.be':     { name: 'Export Manager',     role: 'Export' },
}

function profileFromEmail(email: string): AuthUser {
  const p = ADMIN_PROFILES[email.toLowerCase()] ?? { name: email.split('@')[0], role: 'Admin' }
  return { email, name: p.name, role: p.role }
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user?.email ? profileFromEmail(data.session.user.email) : null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.email ? profileFromEmail(session.user.email) : null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) return null
    return error.message === 'Invalid login credentials'
      ? 'Email ou mot de passe incorrect.'
      : error.message
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: user !== null, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
