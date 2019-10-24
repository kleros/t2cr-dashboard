import { FETCH_TOKENS_DEPOSITS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TOKENS_DEPOSITS: 
            return action.payload;
        default:
            return state;
    }
};