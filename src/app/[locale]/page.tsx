import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import HomeFirstScreen from '@/components/home/first-screen';
import HomeSecondScreen from '@/components/home/second-screen';
import ThirdScreen from '@/components/home/third-screen';
import HomeFourthScreen from '@/components/home/fourth-screen';
import HomeFifthScreen from '@/components/home/fifth';
import HomeSixthScreen from '@/components/home/sixth-screen';
import HomeSeventhScreen from '@/components/home/seventh-screen';


export default function IndexPage({params}: PageProps<'/[locale]'>) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);
  return (
    <PageLayout isShowFooter>
        <HomeFirstScreen />
        <HomeSecondScreen />
        <ThirdScreen />
        <HomeFourthScreen />
        <HomeFifthScreen />
        <HomeSixthScreen />
        <HomeSeventhScreen />
    </PageLayout>
  );
}