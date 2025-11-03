import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
type Props = {
  children?: ReactNode;
  title: ReactNode;
  isShowFooter: boolean;
};

export default function PageLayout({children, title, isShowFooter}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <main className="app h-full flex flex-col">
        <Navbar />
        {children}
        { isShowFooter && <Footer />}
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-2 h-screen border-red-300'></div>
    </main>
  );
}