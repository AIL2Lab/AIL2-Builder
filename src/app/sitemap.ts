import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ail2.org'
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
            en: `${baseUrl}/en`,
            es: `${baseUrl}/es`,
            ja: `${baseUrl}/ja`,
            ko: `${baseUrl}/ko`,
            pt: `${baseUrl}/pt`,
            ru: `${baseUrl}/ru`,
            tr: `${baseUrl}/tr`,
            zh: `${baseUrl}/zh`,
        }
      }
    },
    {
      url: `${baseUrl}/ecosystem`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
            en: `${baseUrl}/en/ecosystem`,
            es: `${baseUrl}/es/ecosystem`,
            ja: `${baseUrl}/ja/ecosystem`,
            ko: `${baseUrl}/ko/ecosystem`,
            pt: `${baseUrl}/pt/ecosystem`,
            ru: `${baseUrl}/ru/ecosystem`,
            tr: `${baseUrl}/tr/ecosystem`,
            zh: `${baseUrl}/zh/ecosystem`,
        }
      }
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
            en: `${baseUrl}/en/platform`,
            es: `${baseUrl}/es/platform`,
            ja: `${baseUrl}/ja/platform`,
            ko: `${baseUrl}/ko/platform`,
            pt: `${baseUrl}/pt/platform`,
            ru: `${baseUrl}/ru/platform`,
            tr: `${baseUrl}/tr/platform`,
            zh: `${baseUrl}/zh/platform`,
        }
      }
    },
    {
      url: `${baseUrl}/accelerate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
            en: `${baseUrl}/en/accelerate`,
            es: `${baseUrl}/es/accelerate`,
            ja: `${baseUrl}/ja/accelerate`,
            ko: `${baseUrl}/ko/accelerate`,
            pt: `${baseUrl}/pt/accelerate`,
            ru: `${baseUrl}/ru/accelerate`,
            tr: `${baseUrl}/tr/accelerate`,
            zh: `${baseUrl}/zh/accelerate`,
        }
      }
    },
    {
      url: `${baseUrl}/fqa`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: {
        languages: {
            en: `${baseUrl}/en/fqa`,
            es: `${baseUrl}/es/fqa`,
            ja: `${baseUrl}/ja/fqa`,
            ko: `${baseUrl}/ko/fqa`,
            pt: `${baseUrl}/pt/fqa`,
            ru: `${baseUrl}/ru/fqa`,
            tr: `${baseUrl}/tr/fqa`,
            zh: `${baseUrl}/zh/fqa`,
        }
      }
    },
  ]
}