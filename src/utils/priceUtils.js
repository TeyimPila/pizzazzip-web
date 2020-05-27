import { exchangeRate } from './constants';

export const euroValue = (dollarValue) => Math.round((dollarValue * exchangeRate + Number.EPSILON) * 100) / 100;
