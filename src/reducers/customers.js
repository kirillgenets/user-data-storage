import { ADD_CUSTOMER } from '../actions/customers';

const initialState = { items: [] };

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export default customersReducer;
