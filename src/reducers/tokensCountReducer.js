import { FETCH_TOKENS_COUNT } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TOKENS_COUNT: 
            return action.payload;
        default:
            return state;
    }
};