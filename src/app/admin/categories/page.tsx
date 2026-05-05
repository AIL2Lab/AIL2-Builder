import prisma from '@/lib/prisma';
import CategoriesManager from './_components/CategoriesManager';

// The page reads from the database on every request and is gated by the
// admin_session cookie at the middleware layer; both make it inherently
// dynamic. Force-dynamic is explicit so Next.js' prerender pass at build
// time doesn't try to hit Prisma without a DB.
export const dynamic = 'force-dynamic';

// Server Component for the categories admin: prisma query happens during
// SSR so the modal-driven CategoriesManager renders with data on first
// paint, no client-side useEffect waterfall. Mutations still go through
// /api/admin/categories so middleware-level auth + CSRF apply uniformly.
async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, slug: true, description: true },
  });
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <CategoriesManager initialCategories={categories} />
    </div>
  );
}
