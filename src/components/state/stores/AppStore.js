// IMPORT PACKAGE REFERENCES
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

// IMPORT MIDDLEWARE

// IMPORT REDUCERS


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(promiseMiddleware, thunk, logger))
export const persistor = persistStore(store)
// export default () => {
//
//     return { store, persistor }
// }
