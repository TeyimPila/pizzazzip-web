import Types from '../actions/ActionTypes';
import { remove } from 'lodash';

export const initialState = {
    orderItems: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case Types.ADD_TO_CART: {
            return { ...state, orderItems: [...state.orderItems, action.payload] };
        }

        case Types.EMPTY_CART: {
            return { ...state, orderItems: [] };
        }
        case Types.DELETE_CART_ITEM: {
            const orderItems = Object.assign([], state.orderItems);
            remove(orderItems, { uuid: action.payload })
            return { ...state, orderItems };
        }
        default:
            return state;
    }
};


