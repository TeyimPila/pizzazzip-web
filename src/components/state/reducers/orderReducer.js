import { asyncActionNames } from '../actionCreator/ActionCreator';
import Types from '../actions/ActionTypes';

export const initialState = {
    orders: [],
    loading: false,
    ordersLoaded: false,
    failed: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case asyncActionNames(Types.SUBMIT_ORDER).loading: {
            return { ...state, loading: true, ordersLoaded: false };
        }
        case asyncActionNames(Types.SUBMIT_ORDER).success: {
            const { data } = action.payload;

            return {
                ...state,
                orders: [
                    ...state.orders,
                    { ...data }
                ],
                loading: false,
                ordersLoaded: true
            };
        }
        case asyncActionNames(Types.SUBMIT_ORDER).failure: {
            return { ...state, failed: true, loading: false, ordersLoaded: false };
        }

        default:
            return state;
    }
};


