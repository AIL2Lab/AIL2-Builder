import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import clsx from 'clsx';
type Props = {
  children?: ReactNode;
  title: ReactNode;
  isShowFooter: boolean;
  className?: string;
};

export default function PageLayout({children, title, isShowFooter, className}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <main className={clsx("app w-full flex flex-col", className)}>
        <Navbar />
        {children}
        { isShowFooter && <Footer />}
    </main>
  );
}