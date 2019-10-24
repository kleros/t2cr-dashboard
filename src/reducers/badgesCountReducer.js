import { FETCH_BADGES_COUNT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_BADGES_COUNT:
      return action.payload;
    default:
      return state;
  }
};