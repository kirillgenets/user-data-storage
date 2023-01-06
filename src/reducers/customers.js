import { ADD_CUSTOMER, REMOVE_CUSTOMER } from '../actions/customers';

const initialState = { items: [] };

const filterByEmail = (items, action) =>
  items.filter((item) => item.email !== action.payload.email);

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        items: [...filterByEmail(state.items, action), action.payload],
      };
    case REMOVE_CUSTOMER:
      return { ...state, items: filterByEmail(state.items, action) };
    default:
      return state;
  }
};

export default customersReducer;
