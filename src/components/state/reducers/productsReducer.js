import { asyncActionNames } from '../actionCreator/ActionCreator';
import Types from '../actions/ActionTypes';
import { filter } from 'lodash';

export const initialState = {
    products: [],
    pizzas: [],
    toppings: [],
    drinks: [],
    loading: false,
    productsLoaded: false,
    selectedProduct: null,
    failed: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case asyncActionNames(Types.FETCH_PRODUCTS).loading: {
            return { ...state, loading: true, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCTS).success: {
            const { data, links, meta } = action.payload;
            const pizzas = filter(data, { type: 'pizza' });
            const toppings = filter(data, { type: 'topping' });
            const drinks = filter(data, { type: 'drink' });

            return {
                ...state, pizzas,
                toppings,
                drinks,
                meta,
                links,
                loading: false,
                productsLoaded: true
            };
        }
        case asyncActionNames(Types.FETCH_PRODUCTS).failure: {
            return { ...state, failed: true, loading: false, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).loading: {
            return { ...state, loading: true, productsLoaded: false };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).success: {
            const { data } = action.payload;
            return { ...state, product: data, loading: false, productsLoaded: true };
        }
        case asyncActionNames(Types.FETCH_PRODUCT).failure: {
            return { ...state, failed: true, loading: false, productsLoaded: false };
        }

        case Types.SET_PRODUCT: {
            const { product } = action.payload;
            return { ...state, selectedProduct: product };
        }
        default:
            return state;
    }
};


