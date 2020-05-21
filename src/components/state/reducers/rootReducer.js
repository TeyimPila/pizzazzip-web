// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { FetchZipCodesReducer } from './FetchZipCodesReducer';
import products from './productsReducer';


// EXPORT APP REDUCER

export default combineReducers({
    products,
    zipCodes: FetchZipCodesReducer
});
