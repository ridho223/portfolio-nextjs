'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Language = 'id' | 'en'
type Theme = 'dark' | 'light'

type SiteContextType = {
  language: Language
  theme: Theme
  setLanguage: (value: Language) => void
  setTheme: (value: Theme) => void
}

const SiteContext = createContext<SiteContextType | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id')
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    const savedTheme = localStorage.getItem('theme')

    if (savedLanguage === 'id' || savedLanguage === 'en') {
      setLanguage(savedLanguage)
    }

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  return (
    <SiteContext.Provider
      value={{ language, theme, setLanguage, setTheme }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error('useSite must be used inside SiteProvider')
  }

  return context
}