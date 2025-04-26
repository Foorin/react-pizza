import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.sass';

function Pagination({ currentPage, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={1}
      pageCount={4}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}
export default Pagination;
