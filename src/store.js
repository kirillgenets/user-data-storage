import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const store = createStore(persistReducer({ key: 'root', storage }, rootReducer));

export const persistor = persistStore(store);

export default store;
