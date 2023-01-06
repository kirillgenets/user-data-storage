import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import Pagination from './Pagination';

import { selectCustomers } from '../../selectors/customers';
import { FieldName } from '../../constants';

const COLUMNS = [
  {
    key: FieldName.FirstName,
    name: 'First name',
  },
  {
    key: FieldName.LastName,
    name: 'Last name',
  },
  {
    key: FieldName.Email,
    name: 'E-Mail',
  },
  {
    key: FieldName.BirthDate,
    name: 'Date of birth',
  },
];

const ITEMS_PER_PAGE = 2;

const DataTable = () => {
  const customers = useSelector(selectCustomers);

  const [itemOffset, setItemOffset] = useState(0);

  const items = customers.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pagesCount = Math.ceil(customers.length / ITEMS_PER_PAGE);

  const handlePageChange = useCallback(
    (evt) => {
      console.log('🚀 ~ file: DataTable.jsx:70 ~ DataTable ~ evt', evt);
      const newOffset = (evt.selected * ITEMS_PER_PAGE) % customers.length;
      setItemOffset(newOffset);
    },
    [customers],
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {COLUMNS.map(({ name, key }) => (
              <th key={key}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item[FieldName.Email]}>
              {COLUMNS.map(({ key }) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination onPageChange={handlePageChange} pagesCount={pagesCount} />
    </div>
  );
};

export default DataTable;
