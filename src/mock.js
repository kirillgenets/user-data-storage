import { FieldName } from './constants';

export const generateMockCustomers = (count = 100) =>
  new Array(count).fill(null).map((_, i) => ({
    [FieldName.FirstName]: 'Test',
    [FieldName.LastName]: 'Test',
    [FieldName.Email]: `${i}@example.com`,
    [FieldName.BirthDate]: '1995-01-01',
  }));
