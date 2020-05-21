import { asyncRequest } from '../actionCreator/ActionCreator';
import Types from './ActionTypes';

export const fetchProducts = () =>
    asyncRequest(Types.FETCH_PRODUCTS, 'products', 'get');

export const fetchProduct = (id) =>
    asyncRequest(Types.FETCH_PRODUCT, `products/${id}`, 'get');
