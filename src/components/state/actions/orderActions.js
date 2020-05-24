import { asyncRequest } from '../actionCreator/ActionCreator';
import Types from './ActionTypes';

export const submitOrder = (payload) =>
    asyncRequest(Types.SUBMIT_ORDER, 'orders', 'post', payload);
