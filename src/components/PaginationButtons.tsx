import React from 'react';
import PaginationControlButton from './PaginationControlButton';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface Props {
  currentPage: number;
  setPage: (page: number) => void
  setPrevPage: () => void,
  setNextPage: () => void,
  totalPages: number
}

const PaginationButtons = ({ currentPage, setPrevPage, setNextPage, setPage, totalPages }: Props): React.ReactNode => {
  const getPaginationPages = (currentPage: number, totalPages: number) => {
    const visiblePages = 3;
    const pages: (number | string)[] = [];

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };
  const goToNextPage = () => {
    setNextPage()
  }
  const goToPreviousPage = () => {
    setPrevPage()
  };

  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="w-100 flex-center-y justify-content-between pagination-holder">
      <PaginationControlButton
        disabled={currentPage === 1}
        onClick={goToPreviousPage}
      >
        <FaAngleLeft />
      </PaginationControlButton>


      <div className="pagination-bullets flex-center-y gap-2">
        {paginationPages.map((pageItem, index) => (
          pageItem === '...' ? (
            <span key={index} className="ellipsis">...</span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(pageItem as number)}
              className={`page-number rounded-1 border-0 ${pageItem === currentPage && 'active'}`}
            >
              {pageItem}
            </button>
          )
        ))}
      </div>

      <PaginationControlButton
        disabled={currentPage >= totalPages}
        onClick={goToNextPage}
      >
        <FaAngleRight />
      </PaginationControlButton>
    </div>
  );
};

export default PaginationButtons;
