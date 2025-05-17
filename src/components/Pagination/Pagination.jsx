import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.sass';

function Pagination({ currentPage, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected)}
      pageRangeDisplayed={1}
      pageCount={4}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
}
export default Pagination;
