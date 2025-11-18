import { defineRouting } from "next-intl/routing";


export const routing = defineRouting({
    locales: ['en', 'ko', 'ja', 'es', 'pt', 'ru', 'tr', 'zh'],
    defaultLocale: 'en'
})