import { mount } from 'enzyme';
import { Provider } from 'react-redux';
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

  it('should validate first name', () => {
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
      .simulate('change', { target: { value: 'test' } });

    component
      .find(`.form__input[name="${FieldName.Email}"]`)
      .simulate('change', { target: { value: 'test@example.com' } });

    component
      .find(`.form__input[name="${FieldName.BirthDate}"]`)
      .simulate('change', { target: { value: '1995-01-01' } });

    expect(component.find('.form__error')).toHaveLength(1);
    expect(component.find('.form__field:first-child .form__error')).toHaveLength(1);
  });

  it('should validate last name', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form validateOnChange />
      </Provider>,
    );

    component
      .find(`.form__input[name="${FieldName.FirstName}"]`)
      .simulate('change', { target: { value: 'test' } });

    component
      .find(`.form__input[name="${FieldName.LastName}"]`)
      .simulate('change', { target: { value: '123' } });

    component
      .find(`.form__input[name="${FieldName.Email}"]`)
      .simulate('change', { target: { value: 'test@example.com' } });

    component
      .find(`.form__input[name="${FieldName.BirthDate}"]`)
      .simulate('change', { target: { value: '1995-01-01' } });

    expect(component.find('.form__error')).toHaveLength(1);
    expect(component.find('form').childAt(1).find('.form__error')).toHaveLength(1);
  });

  it('should validate email', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form validateOnChange />
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
      .simulate('change', { target: { value: '123' } });

    component
      .find(`.form__input[name="${FieldName.BirthDate}"]`)
      .simulate('change', { target: { value: '1995-01-01' } });

    expect(component.find('.form__error')).toHaveLength(1);
    expect(component.find('form').childAt(2).find('.form__error')).toHaveLength(1);
  });

  it('should validate birthdate', () => {
    const store = mockStore({});
    const component = mount(
      <Provider store={store}>
        <Form validateOnChange />
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
      .simulate('change', { target: { value: '123' } });

    expect(component.find('.form__error')).toHaveLength(1);
    expect(component.find('form').childAt(3).find('.form__error')).toHaveLength(1);
  });
});
