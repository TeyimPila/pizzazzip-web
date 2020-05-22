import Types from '../actions/ActionTypes';

export const initialState = {
    orderItems: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case Types.ADD_TO_CART: {
            return { ...state, orderItems: [...state.orderItems, action.payload] };
        }
        default:
            return state;
    }
};


