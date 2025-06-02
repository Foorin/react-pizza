import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.sass';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected)}
      pageRangeDisplayed={1}
      pageCount={3}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
