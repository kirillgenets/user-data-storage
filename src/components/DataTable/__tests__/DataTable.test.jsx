import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureMockStore from '../../../__testUtils__/configureMockStore';
import { generateMockCustomers } from '../../../mock';

import DataTable from '../DataTable';
import { ITEMS_PER_PAGE } from '../constants';
import Pagination from '../../Pagination';
import { FieldName } from '../../../constants';

const mockStore = configureMockStore();

describe('DataTable', () => {
  it('should render correctly', () => {
    const store = mockStore({ customers: { items: generateMockCustomers() } });
    const component = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.data-table')).toHaveLength(1);
  });

  it('should not be rendered without items', () => {
    const store = mockStore({ customers: { items: [] } });
    const component = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    expect(component.find('.data-table')).toHaveLength(0);
  });

  it(`should render only ${ITEMS_PER_PAGE} items per page`, () => {
    const store = mockStore({ customers: { items: generateMockCustomers() } });
    const component = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    expect(component.find('tbody .data-table__row')).toHaveLength(ITEMS_PER_PAGE);
  });

  it('should provide correct pages count to Pagination', () => {
    const customers = generateMockCustomers();
    const store = mockStore({ customers: { items: customers } });
    const component = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    expect(component.find(Pagination).props().pagesCount).toBe(customers.length / ITEMS_PER_PAGE);
  });

  it('should filter customers by search', () => {
    const customers = generateMockCustomers();
    const store = mockStore({ customers: { items: customers } });
    const component = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    expect(component.find('tbody .data-table__row')).toHaveLength(ITEMS_PER_PAGE);

    component
      .find('.data-table__search')
      .simulate('change', { target: { value: customers[customers.length - 1][FieldName.Email] } });
    expect(component.find('tbody .data-table__row')).toHaveLength(1);
  });
});
