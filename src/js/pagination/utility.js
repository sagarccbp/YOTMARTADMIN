import classNames from "classnames";
import React from 'react';

const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

const PaginationItem = ({ page, currentPage, onPageChange }) => {
  const liClasses = classNames({
    "page-item": true,
    active: page === currentPage,
  });
  return (
    <li className={liClasses} onClick={() => onPageChange(page)}>
      <a className="page-link" href="#">
        {page}
      </a>
    </li>
  );
};

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
    </ul>
  );
};

export default Pagination;