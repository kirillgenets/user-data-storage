import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ADD_CUSTOMER } from '../../../actions/customers';
import { FieldName } from '../../../constants';

import configureMockStore from '../../../__testUtils__/configureMockStore';

import Form from '../Form';

const mockStore = configureMockStore();

describe('Form', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.form')).toHaveLength(1);
  });

  it('should validate on save', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form validateOnChange />
      </Provider>,
    );

    component
      .find(`.form__input[name="${FieldName.FirstName}"]`)
      .simulate('change', { target: { value: '123' } });

    component
      .find(`.form__input[name="${FieldName.LastName}"]`)
      .simulate('change', { target: { value: '123' } });

    component
      .find(`.form__input[name="${FieldName.Email}"]`)
      .simulate('change', { target: { value: '123' } });

    component
      .find(`.form__input[name="${FieldName.BirthDate}"]`)
      .simulate('change', { target: { value: '123' } });

    component.find('form').simulate('submit');

    expect(component.find('.form__error')).toHaveLength(4);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should call the @customers/addCustomer action on submit', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form />
      </Provider>,
    );

    component
      .find(`.form__input[name="${FieldName.FirstName}"]`)
      .simulate('change', { target: { value: 'test' } });

    component
      .find(`.form__input[name="${FieldName.LastName}"]`)
      .simulate('change', { target: { value: 'test' } });

    component
      .find(`.form__input[name="${FieldName.Email}"]`)
      .simulate('change', { target: { value: 'test@example.com' } });

    component
      .find(`.form__input[name="${FieldName.BirthDate}"]`)
      .simulate('change', { target: { value: '1995-01-01' } });

    component.find('form').simulate('submit');

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: ADD_CUSTOMER,
        payload: {
          [FieldName.FirstName]: 'test',
          [FieldName.LastName]: 'test',
          [FieldName.Email]: 'test@example.com',
          [FieldName.BirthDate]: '1995-01-01',
        },
      },
    ]);
  });
});
