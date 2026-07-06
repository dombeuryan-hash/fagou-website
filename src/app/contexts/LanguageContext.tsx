import { createContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../types'
import { LANGUAGE_STORAGE_KEY } from '../constants'

interface LanguageContextValue {
  language: Language
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  t: (fr: string, en: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  return 'fr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === 'fr' ? 'en' : 'fr'
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
      return next
    })
  }, [])

  const setLanguageDirect = useCallback((lang: Language) => {
    setLanguage(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }, [])

  const t = useCallback(
    (fr: string, en: string): string => (language === 'fr' ? fr : en),
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: setLanguageDirect, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
