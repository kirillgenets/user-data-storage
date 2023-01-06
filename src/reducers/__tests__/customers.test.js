import { ADD_CUSTOMER, REMOVE_CUSTOMER } from '../../actions/customers';
import { FieldName } from '../../constants';
import { generateMockCustomers } from '../../mock';
import customersReducer from '../customers';

describe('customersReducer', () => {
  it('check the initial state', () => {
    const expectedState = { items: [] };
    expect(customersReducer(undefined, {})).toEqual(expectedState);
  });

  it('should add new customer using the @customers/add-customer action', () => {
    const customers = generateMockCustomers(10);
    const action = {
      type: ADD_CUSTOMER,
      payload: {
        [FieldName.FirstName]: 'test',
        [FieldName.LastName]: 'test',
        [FieldName.Email]: 'test@example.com',
        [FieldName.BirthDate]: '1995-01-01',
      },
    };
    const newState = customersReducer({ items: customers }, action);
    expect(newState.items.length).toBe(customers.length + 1);
  });

  it('should avoid duplicate email values when calling the @customers/add-customer action', () => {
    const customers = generateMockCustomers(10);
    const action = {
      type: ADD_CUSTOMER,
      payload: customers[0],
    };
    const newState = customersReducer({ items: customers }, action);
    expect(newState.items.length).toBe(customers.length);
  });

  it('should remove customers using the @customers/remove-customer action', () => {
    const customers = generateMockCustomers(10);
    const action = {
      type: REMOVE_CUSTOMER,
      payload: customers[0],
    };
    const newState = customersReducer({ items: customers }, action);
    expect(newState.items.length).toBe(customers.length - 1);
  });

  it('should return default state when the action is incorrect', () => {
    const customers = generateMockCustomers(10);
    const action = {
      type: 'fake-action',
      payload: customers[0],
    };
    const newState = customersReducer({ items: customers }, action);
    expect(newState).toEqual({ items: customers });
  });
});
