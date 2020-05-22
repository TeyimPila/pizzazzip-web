import Types from './ActionTypes';


export const addToCart = (orderItem) => ({
    type: Types.ADD_TO_CART,
    payload: orderItem
});
