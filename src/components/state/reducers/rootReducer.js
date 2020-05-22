import { combineReducers } from 'redux';
import products from './productsReducer';
import cart from './cartReducer';


export default combineReducers({
    cart,
    products,
});

