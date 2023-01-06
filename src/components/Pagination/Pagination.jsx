import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './style.css';

const Pagination = ({ onPageChange, pagesCount }) => {
  return (
    <ReactPaginate
      pageClassName="pagination__item"
      previousClassName="pagination__item pagination__item--prev"
      nextClassName="pagination__item pagination__item--next"
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pagesCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pagesCount: PropTypes.number,
};

Pagination.defaultProps = {
  pagesCount: 0,
};

export default Pagination;
