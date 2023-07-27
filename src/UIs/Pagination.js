import React from "react";
import './Pagination.css'


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className='pagination'>
      <ul className='pageList'>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`pageItem ${
              pageNumber === currentPage ? 'active' : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;