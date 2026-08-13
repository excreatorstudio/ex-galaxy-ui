import { isLocale, type Locale } from './localeTypes'

export const localeStorageKey = 'ex-galaxy.locale'

function safeStorage() {
  try { return window.localStorage } catch { return null }
}

/** zh variants share the Traditional Chinese showcase; unrecognised locales use English. */
export function resolveLocale(language?: string | null): Locale {
  const value = language?.toLowerCase() ?? ''
  if (value.startsWith('zh')) return 'zh-TW'
  if (value.startsWith('ja')) return 'ja'
  if (value.startsWith('ko')) return 'ko'
  return 'en'
}

export function getInitialLocale(navigatorLanguage?: string): Locale {
  const stored = safeStorage()?.getItem(localeStorageKey)
  if (isLocale(stored)) return stored
  return navigatorLanguage ? resolveLocale(navigatorLanguage) : 'zh-TW'
}

export function persistLocale(locale: Locale) {
  try { safeStorage()?.setItem(localeStorageKey, locale) } catch { /* Local storage is an enhancement only. */ }
}
