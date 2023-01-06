export const ADD_CUSTOMER = '@customers/add-customer';
export const REMOVE_CUSTOMER = '@customers/remove-customer';

export const addCustomer = (payload) => ({
  type: ADD_CUSTOMER,
  payload,
});

export const removeCustomer = (payload) => ({
  type: REMOVE_CUSTOMER,
  payload,
});
