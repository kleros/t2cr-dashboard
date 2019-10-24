import { FETCH_BADGES_DEPOSITS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_BADGES_DEPOSITS:
            return action.payload;
        default:
            return state;
    }
};