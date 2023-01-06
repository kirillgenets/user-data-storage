import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onPageChange, pagesCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pagesCount}
      previousLabel="< previous"
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
