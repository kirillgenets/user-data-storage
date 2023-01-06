import React from 'react';
import PropTypes from 'prop-types';
import { FieldName } from '../../constants';

const MOCK_DATA = [
  {
    [FieldName.FirstName]: 'Kiryl',
    [FieldName.LastName]: 'Henets',
    [FieldName.Email]: 'test@example.com',
    [FieldName.BirthDate]: '1990-10-08',
  },
];

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

const DataTable = () => {
  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map(({ name, key }) => (
            <th key={key}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {MOCK_DATA.map((item) => (
          <tr key={item[FieldName.Email]}>
            {COLUMNS.map(({ key }) => (
              <td key={key}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {};
DataTable.defaultProps = {};

export default DataTable;
