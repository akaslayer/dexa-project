import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TabelAdminPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const pages: number[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-1 py-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        className="h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`h-8 min-w-8 px-3 rounded-lg text-sm transition-colors ${
            currentPage === page
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        className="h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TabelAdminPagination;
