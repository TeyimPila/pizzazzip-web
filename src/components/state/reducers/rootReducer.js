import { combineReducers } from 'redux';
import products from './productsReducer';
import cart from './cartReducer';
import orders from './orderReducer';

export default combineReducers({
    cart,
    products,
    orders
});

