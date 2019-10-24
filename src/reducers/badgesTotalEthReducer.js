import _ from "lodash";
import { FETCH_BADGES_DEPOSITS } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_BADGES_DEPOSITS:
      const depositsByBadge = action.payload;

      // Total sum (all badges)
      let totalEth = 0;
      
      _.forOwn(depositsByBadge, function(deposits, badge) {
        
        // Sum the value of all deposits on the badge
        const badgeTotalEth = deposits.reduce((total, deposit) => {
          return total + (deposit.value / Math.pow(10, 18));
        }, 0);

        totalEth += badgeTotalEth;
      });

      return totalEth;
    default:
      return state;
  }
};
