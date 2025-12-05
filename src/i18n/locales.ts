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

export type LocaleLabel = typeof localeLabels[keyof typeof localeLabels];
