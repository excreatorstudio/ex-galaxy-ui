export const supportedLocales = ['zh-TW', 'en', 'ja', 'ko'] as const

export type Locale = typeof supportedLocales[number]
export type TranslationDictionary = Record<string, string>

export const localeLabels: Record<Locale, string> = {
  'zh-TW': '繁中',
  en: 'EN',
  ja: '日本語',
  ko: '한국어',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (supportedLocales as readonly string[]).includes(value)
}
