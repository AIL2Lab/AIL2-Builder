import { defineRouting } from "next-intl/routing";


export const routing = defineRouting({
    locales: ['en', 'zh', 'ko', 'ja', 'es', 'pt', 'ru', 'tr'],
    defaultLocale: 'en'
})