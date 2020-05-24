import { asyncRequest } from '../actionCreator/ActionCreator';
import Types from './ActionTypes';

export const fetchProducts = () =>
    asyncRequest(Types.FETCH_PRODUCTS, 'products', 'get');

export const setProduct = (product) => ({
    type: Types.SET_PRODUCT,
    payload: product
});
