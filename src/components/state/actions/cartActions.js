import Types from './ActionTypes';


export const addToCart = (orderItem) => ({
    type: Types.ADD_TO_CART,
    payload: orderItem
});

export const emptyCart = () => ({
    type: Types.EMPTY_CART,
    payload: {}
});

export const deleteCartItem = (uuid) => ({
    type: Types.DELETE_CART_ITEM,
    payload: uuid
});
