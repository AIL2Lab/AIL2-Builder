export const localeLabels = {
  en: '🇬🇧English',
  ko: '🇰🇷한국어',
  ja: '🇯🇵日本語',
  es: '🇪🇸Español',
  pt: '🇵🇹Português',
  ru: '🇷🇺Русский',
  tr: '🇹🇷Türkçe',
  zh: '🇨🇳简体中文',
} as const;
export const shortLocaleLabels = {
  en: '🇬🇧English',
  ko: '🇰🇷한국어',
  ja: '🇯🇵日本語',
  es: '🇪🇸Español',
  pt: '🇵🇹Português',
  ru: '🇷🇺Русский',
  tr: '🇹🇷Türkçe',
  zh: '🇨🇳中文',
} as const;


export const localeMap = {
  en: { label: 'English', flag: 'GB' },
  ko: { label: '한국어', flag: 'KR' },
  ja: { label: '日本語', flag: 'JP' },
  es: { label: 'Español', flag: 'ES' },
  pt: { label: 'Português', flag: 'PT' },
  ru: { label: 'Русский', flag: 'RU' },
  tr: { label: 'Türkçe', flag: 'TR' },
  zh: { label: '简体中文', flag: 'CN' },
}
export type LocaleLabel = typeof localeLabels[keyof typeof localeLabels];
