'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sora } from 'next/font/google';
import { useRouter } from 'next/navigation';
import '../globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

// Admin Logo component
function AdminLogo({ className }: { className?: string }) {
  return (
    <div className={`bg-[#121212] rounded-full nav-circle ${className}`}>
      <Link href="/">
        <Image
          src="/svg/logo.svg"
          alt="AIL2 Logo"
          width={50}
          height={50}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
    </div>
  );
}

function AdminLogoSmall({ className }: { className?: string }) {
  return (
    <div className={`bg-[#121212] rounded-full nav-circle-small ${className}`}>
      <Link href="/">
        <Image
          src="/svg/logo.svg"
          alt="AIL2 Logo"
          width={33}
          height={33}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${sora.variable} antialiased bg-[#010101] text-[#ededed] min-h-screen`}>
        <div className="w-full sticky flex items-center justify-center top-6 md:top-12 z-50 mb-8">
          <nav className="items-center hidden md:grid grid-cols-2 bg-[#121212] relative h-[84px] rounded-2xl w-[1200px] max-w-[90vw]">
            <div className="flex col-span-1 items-center pr-20 space-x-4 lg:space-x-6 xl:space-x-12">
              <Link
                href="/admin/posts"
                className="text-base font-normal ml-5 lg:ml-10 text-[#ededed] hover:text-theme transition-colors"
              >
                文章管理
              </Link>
              <Link
                href="/admin/categories"
                className="text-base font-normal text-[#ededed] hover:text-theme transition-colors"
              >
                分类管理
              </Link>
            </div>
            <div className="flex col-span-1 items-center pl-20 space-x-4 lg:space-x-6">
              <div className="text-base font-normal flex flex-1 justify-end ml-4 lg:ml-8 items-center space-x-4">
                <Link
                  href="/"
                  target="_blank"
                  className="text-sm text-[#ededed]/70 hover:text-theme transition-colors"
                >
                  查看网站 →
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  退出登录
                </button>
              </div>
            </div>
            <AdminLogo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </nav>

          {/* Mobile nav */}
          <nav className="w-full flex items-center justify-between md:hidden px-2.5">
            <AdminLogoSmall />
            <div className="flex items-center space-x-3">
              <Link
                href="/admin/posts"
                className="text-sm text-[#ededed]/70"
              >
                文章
              </Link>
              <Link
                href="/admin/categories"
                className="text-sm text-[#ededed]/70"
              >
                分类
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400"
              >
                退出
              </button>
            </div>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
