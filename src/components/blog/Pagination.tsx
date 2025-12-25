
import Link from 'next/link';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}
export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          上一页
        </Link>
      )}
      <div className="hidden sm:flex space-x-2">
        {pages.map((page) => {
           if (
             page === 1 ||
             page === totalPages ||
             (page >= currentPage - 1 && page <= currentPage + 1)
           ) {
             return (
              <Link
                key={page}
                href={`${baseUrl}?page=${page}`}
                className={`px-4 py-2 border rounded transition ${currentPage === page ? 'bg-black text-white border-black': 'hover:bg-gray-100 text-gray-700'}`}
              >
                {page}
              </Link>
             );
           }
           return null;
        })}
      </div>
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          下一页
        </Link>
      )}
    </div>
  );
}