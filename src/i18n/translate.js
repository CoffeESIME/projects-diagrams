import english from './en.json'

export const STORAGE_KEY = 'graphrag-language'

// Spanish source text is also the fallback for untranslated technical names.
export function translate(language, value, parameters = {}) {
  if (typeof value !== 'string') return value
  const key = value.trim()
  const message = language === 'en' && Object.hasOwn(english, key) ? english[key] : key
  const interpolated = message.replace(/\{(\w+)\}/g, (match, name) =>
    Object.hasOwn(parameters, name) ? String(parameters[name]) : match,
  )
  return value.slice(0, value.length - value.trimStart().length) + interpolated + value.slice(value.trimEnd().length)
}

export function readLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'es' ? 'es' : 'en'
  } catch {
    return 'en'
  }
}
