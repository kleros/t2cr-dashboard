import { combineReducers } from 'redux';
import depositDataReducer from './depositDataReducer';
import ethPriceReducer from './ethPriceReducer';
import tokensCountByStatusReducer from './tokensCountByStatusReducer';
import badgesCountByStatusReducer from "./badgesCountByStatusReducer";
import crowdfundingTokensReducer from './crowdfundingTokensReducer';
import crowdfundingPageReducer from './crowdfundingPageReducer';

export default combineReducers({
    depositData: depositDataReducer,
    priceEth: ethPriceReducer,
    tokensCountByStatus: tokensCountByStatusReducer,
    badgesCountByStatus: badgesCountByStatusReducer,
    crowdfundingTokens: crowdfundingTokensReducer,
    crowdfundingPage: crowdfundingPageReducer
});
