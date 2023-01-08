import { FieldName } from '../../../constants';

const filterByText = (value, search) => value.toLowerCase().includes(search.toLowerCase());

const filterData = (items, search) =>
  items.filter(
    (item) =>
      filterByText(item[FieldName.FirstName], search) ||
      filterByText(item[FieldName.LastName], search) ||
      filterByText(item[FieldName.Email], search) ||
      filterByText(item[FieldName.BirthDate], search),
  );

export default filterData;
