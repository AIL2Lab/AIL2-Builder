'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';

type Props = {
  error: Error;
  reset(): void;
};

export const metadata : Metadata ={
  title: 'error'
}

export default function Error({error, reset}: Props) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayout isShowFooter={false}>
      <div className='container mx-auto lg:max-w-7xl md:my-24 lg:my-32 px-5 flex justify-center items-center'>
        <div>
          {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className="text-white underline underline-offset-2"
              onClick={reset}
              type="button"
            >
              {chunks}
            </button>
          )
        })}
        </div>
      </div>
    </PageLayout>
  );
}