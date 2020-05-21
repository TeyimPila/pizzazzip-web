import { asyncActionNames } from '../actionCreator/ActionCreator';
import Types from '../actions/ActionTypes';

export const initialState = {
    products: [],
    product: null,
    loading: false,
    productsLoaded: false,
    failed: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case asyncActionNames(Types.FETCH_PRODUCTS).loading: {
            return { ...state, loading: true, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCTS).success: {
            const { data, links, meta } = action.payload;
            return { ...state, products: data, meta, links, loading: false, productsLoaded: true };
        }
        case asyncActionNames(Types.FETCH_PRODUCTS).failure: {
            return { ...state, failed: true, loading: false, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).loading: {
            return { ...state, loading: true, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).success: {
            const { data} = action.payload;
            return { ...state, product: data, loading: false, productsLoaded: true };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).failure: {
            return { ...state, failed: true, loading: false, productsLoaded: false };
        }
        default:
            return state;
    }
};


