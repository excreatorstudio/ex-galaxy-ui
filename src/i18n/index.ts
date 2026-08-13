import { useCallback } from 'react'
import { useGalaxyStore } from '../state/useGalaxyStore'
import { en } from './dictionaries/en'
import { ja } from './dictionaries/ja'
import { ko } from './dictionaries/ko'
import { zhTW } from './dictionaries/zh-TW'
import { persistLocale } from './localeStore'
import type { Locale, TranslationDictionary } from './localeTypes'

export { localeLabels, supportedLocales, type Locale, type TranslationDictionary } from './localeTypes'
export { getInitialLocale, localeStorageKey, persistLocale, resolveLocale } from './localeStore'

export const dictionaries: Record<Locale, TranslationDictionary> = { 'zh-TW': zhTW, en, ja, ko }

export function translate(locale: Locale, key: string, values: Record<string, string | number> = {}) {
  const template = dictionaries[locale][key] ?? en[key] ?? key
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`))
}

export function useI18n() {
  const language = useGalaxyStore((state) => state.language) as Locale
  const setLanguage = useGalaxyStore((state) => state.setLanguage)
  const setLocale = useCallback((locale: Locale) => { persistLocale(locale); setLanguage(locale) }, [setLanguage])
  const t = useCallback((key: string, values?: Record<string, string | number>) => translate(language, key, values), [language])
  return { locale: language, setLocale, t }
}
