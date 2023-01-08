import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Pagination from '../Pagination';
import ConfirmationModal from './ConfirmationModal';

import { selectCustomers } from '../../selectors/customers';
import { removeCustomer } from '../../actions/customers';
import { FieldName } from '../../constants';
import { COLUMNS, ITEMS_PER_PAGE } from './constants';
import filterData from './utils/filterData';

import './style.css';

Modal.setAppElement('#root');

const DataTable = () => {
  const dispatch = useDispatch();

  const customers = useSelector(selectCustomers);

  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isError, setIsError] = useState(false);

  const searchedCustomers = useMemo(() => filterData(customers, search), [customers, search]);

  const items = searchedCustomers.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pagesCount = Math.ceil(searchedCustomers.length / ITEMS_PER_PAGE);

  const handlePageChange = useCallback(
    (evt) => {
      const newOffset = (evt.selected * ITEMS_PER_PAGE) % customers.length;
      setItemOffset(newOffset);
    },
    [customers],
  );

  const handleSearch = (evt) => {
    setSearch(evt.target.value);
    setItemOffset(0);
  };

  const handleDeleteClick = (item) => () => {
    setItemToDelete(item);
    setIsError(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
  };

  const handleDeleteSubmit = useCallback(() => {
    try {
      dispatch(removeCustomer(itemToDelete));
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  }, [dispatch, itemToDelete]);

  return customers.length > 0 ? (
    <div className="data-table">
      <input
        type="search"
        className="data-table__search"
        onChange={handleSearch}
        value={search}
        placeholder="Search..."
      />
      <table className="data-table__table">
        <thead>
          <tr className="data-table__row data-table__row--head">
            {COLUMNS.map(({ name, key }) => (
              <th className="data-table__cell data-table__cell--head" key={key}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr className="data-table__row" key={item[FieldName.Email]}>
              {COLUMNS.map(({ key }) => (
                <td className="data-table__cell" key={key}>
                  {item[key]}
                </td>
              ))}
              <td className="data-table__cell">
                <button className="data-table__delete" onClick={handleDeleteClick(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination onPageChange={handlePageChange} pagesCount={pagesCount} />
      {itemToDelete && (
        <ConfirmationModal
          onSubmit={handleDeleteSubmit}
          onCancel={handleDeleteCancel}
          error={isError ? 'Deletion has failed due to the unexpected reason' : ''}
        />
      )}
    </div>
  ) : null;
};

export default DataTable;
