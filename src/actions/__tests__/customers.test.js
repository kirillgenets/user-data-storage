import { generateMockCustomers } from '../../mock';
import configureMockStore from '../../__testUtils__/configureMockStore';
import { addCustomer, ADD_CUSTOMER, removeCustomer, REMOVE_CUSTOMER } from '../customers';

const mockStore = configureMockStore();

describe('Customers actions', () => {
  it('@customers/add-customer', () => {
    const store = mockStore();
    const customer = generateMockCustomers(1)[0];

    const expectedActions = [{ type: ADD_CUSTOMER, payload: customer }];

    store.dispatch(addCustomer(customer));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('@customers/remove-customer', () => {
    const store = mockStore();
    const customer = generateMockCustomers(1)[0];

    const expectedActions = [{ type: REMOVE_CUSTOMER, payload: customer }];

    store.dispatch(removeCustomer(customer));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
