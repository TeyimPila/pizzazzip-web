// IMPORT PACKAGE REFERENCES

import { createStore, applyMiddleware } from 'redux';

// IMPORT MIDDLEWARE

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// IMPORT REDUCERS

import rootReducer from '../reducers/rootReducer';


// CONFIGURE STORE

export const createAppStore = () => {
    return createStore(rootReducer, applyMiddleware(promiseMiddleware, thunk, logger));
};
