import { combineReducers } from 'redux';

import customersReducer from './customers';

const rootReducer = combineReducers({
  customers: customersReducer,
});

export default rootReducer;
