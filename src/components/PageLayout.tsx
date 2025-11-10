import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import clsx from 'clsx';
type Props = {
  children?: ReactNode;
  isShowFooter: boolean;
  className?: string;
};

export default function PageLayout({children, isShowFooter, className}: Props) {
  return (
    <main className={clsx("app w-full flex flex-col", className)}>
        <Navbar />
        {children}
        { isShowFooter && <Footer />}
    </main>
  );
}