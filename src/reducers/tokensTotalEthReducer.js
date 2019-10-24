import { FETCH_TOKENS_DEPOSITS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TOKENS_DEPOSITS: 
            const deposits = action.payload;
            const totalEth = deposits.reduce((total, deposit) => {
                return total + (deposit.value / Math.pow(10,18)); 
            }, 0);
            return totalEth;
        default:
            return state;
    }
};