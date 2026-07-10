import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export default function Pagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange,
  onPageSizeChange 
}: PaginationProps) {
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="px-5 py-3 border-t border-border-default flex flex-wrap items-center justify-between gap-4 text-sm bg-bg-surface">
      <div className="flex items-center gap-6 text-text-secondary">
        <div>
          Showing <span className="font-medium text-text-primary">{startItem}</span> to <span className="font-medium text-text-primary">{endItem}</span> of <span className="font-medium text-text-primary">{totalItems}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <div className="relative">
            <select 
              value={itemsPerPage}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="appearance-none bg-bg-surface border border-border-default rounded-md pl-2 pr-6 py-1 h-7 text-xs text-text-primary focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus cursor-pointer hover:bg-bg-surface-hover transition-colors shadow-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-7 px-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => onPageChange?.(pageNum)}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors ${
                pageNum === currentPage
                  ? 'bg-bg-surface-active text-text-primary'
                  : 'bg-transparent text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-7 px-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
