import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readLanguage, STORAGE_KEY, translate } from './translate'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage)
  const t = useCallback((value, parameters) => translate(language, value, parameters), [language])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, language) } catch { /* Storage may be disabled. */ }
    document.documentElement.lang = language
    document.title = t('Fuzzy GraphRAG — Atlas visual')
    const metadata = {
      'meta[name="description"]': t('Atlas visual de Fuzzy GraphRAG: memoria, privacidad, relaciones difusas y exploración de conocimiento con criterio humano.'),
      'meta[property="og:title"]': document.title,
      'meta[property="og:description"]': t('Exploración cultural personal con asociaciones graduadas y revisión humana: arquitectura, casos exportados y propuestas de evaluación.'),
    }
    Object.entries(metadata).forEach(([selector, content]) => document.querySelector(selector)?.setAttribute('content', content))
  }, [language, t])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage requires LanguageProvider')
  return value
}
