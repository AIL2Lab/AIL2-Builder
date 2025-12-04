import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {notFound} from 'next/navigation';

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) : Promise<Metadata>  {
    const { locale } = await params
    const t = await getTranslations({locale, namespace: 'site'})
    const t2 = await getTranslations({locale, namespace: 'NotFoundPage'})
    return {
      title: `${t2('title')} | ${t('subtitle')}`,
      description: t2('description')
    }
}
export default function CatchAllPage() {
  notFound();
}