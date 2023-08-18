/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Pagination = ({ currentPage, totalPages, onPageChange, params }) => {
   const [displayedPages, setDisplayedPages] = useState([]);

   useEffect(() => {
      updateDisplayedPages(currentPage);
   }, [currentPage, totalPages]);

   const handlePageChange = (page) => {
      onPageChange(page);
      updateDisplayedPages(page);
   };

   const updateDisplayedPages = (page) => {
      let pages = [];

      if (totalPages <= 7) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         if (page <= 2) {
            pages = [1, 2, 3, '...', totalPages];
         } else if (page >= totalPages - 1) {
            pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
         } else if (page - 2 === 1) {
            pages = [1, page - 1, page, page + 1, page + 2, '...', totalPages];
         } else if (page + 2 === totalPages) {
            pages = [1, '...', page - 2, page - 1, page, page + 1, totalPages];
         } else if (page - 3 === 1 && page + 3 !== totalPages) {
            pages = [1, page - 2, page - 1, page, page + 1, page + 2, '...', totalPages];
         } else if (page - 3 !== 1 && page + 3 === totalPages) {
            pages = [1, '...', page - 2, page - 1, page, page + 1, page + 2, totalPages];
         } else if (page - 3 === 1 && page + 3 === totalPages) {
            pages = [1, page - 2, page - 1, page, page + 1, page + 2, totalPages];
         } else {
            pages = [1, '...', page - 2, page - 1, page, page + 1, page + 2, '...', totalPages];
         }
      }
      setDisplayedPages(pages);
   };

   return (
      <nav className={cx('pagination')}>
         <ul>
            <li>
               <Link
                  to={`${window.location.pathname}?${params}=${
                     currentPage <= 1 ? 1 : currentPage - 1
                  }`}
                  className={cx('nav-item')}
                  disabled={currentPage <= 1}
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
               >
                  Previous
               </Link>
            </li>
            {displayedPages.map((page, index) => (
               <li key={index}>
                  <Link
                     to={`${window.location.pathname}?${params}=${page}`}
                     className={cx('nav-item', {
                        active: currentPage === page,
                        disabled: page === '...',
                     })}
                     onClick={() => page !== '...' && handlePageChange(page)}
                  >
                     {page}
                  </Link>
               </li>
            ))}
            <li>
               <Link
                  to={`${window.location.pathname}?${params}=${
                     currentPage >= totalPages ? totalPages : currentPage + 1
                  }`}
                  className={cx('nav-item')}
                  disabled={currentPage === totalPages}
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
               >
                  Next
               </Link>
            </li>
         </ul>
      </nav>
   );
};

export default memo(Pagination);
