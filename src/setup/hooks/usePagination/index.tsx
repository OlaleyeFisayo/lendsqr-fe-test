import { useEffect, useState } from "react";

interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  displayRange: number;
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  pages: (number | string)[];
}

const usePagination = (options: PaginationOptions): PaginationResult => {
  const { currentPage, itemsPerPage, totalItems, displayRange } = options;
  const [pages, setPages] = useState<(number | string)[]>([]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const calculatePages = () => {
      const pageNumbers: (number | string)[] = [];

      if (totalPages <= displayRange) {
        // If the total number of pages is smaller or equal to the display range,
        // show all page numbers from 1 to totalPages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Calculate the start and end page numbers based on the current page and display range
        let startPage = currentPage - Math.floor(displayRange / 2);
        let endPage = currentPage + Math.floor(displayRange / 2);

        if (startPage < 1) {
          // Adjust the start page if it goes below 1
          startPage = 1;
          endPage = displayRange;
        }

        if (endPage > totalPages) {
          // Adjust the end page if it goes beyond the total pages
          endPage = totalPages;
          startPage = totalPages - displayRange + 1;
        }

        // Add the page numbers within the calculated range
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        // Add ellipsis if needed
        if (startPage > 1) {
          pageNumbers.unshift("...");
          pageNumbers.unshift(1);
        }

        if (endPage < totalPages) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      }

      setPages(pageNumbers);
    };

    calculatePages();
  }, [currentPage, itemsPerPage, totalItems, displayRange, totalPages]);

  return { currentPage, totalPages, pages };
};

export default usePagination;
