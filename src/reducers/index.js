import { combineReducers } from 'redux';
import ethPriceReducer from './ethPriceReducer';
import tokensCountReducer from './tokensCountReducer';
import tokensCountByStatusReducer from './tokensCountByStatusReducer';
import tokensDepositsReducer from './tokensDepositsReducer';
import tokensTotalEthReducer from './tokensTotalEthReducer';
import badgesCountReducer from './badgesCountReducer';
import badgesCountByStatusReducer from "./badgesCountByStatusReducer";
import badgesDepositsReducer from './badgesDepositsReducer';
import badgesTotalEthReducer from './badgesTotalEthReducer';
import crowdfundingTokensReducer from './crowdfundingTokensReducer';
import crowdfundingPageReducer from './crowdfundingPageReducer';

export default combineReducers({
    priceEth: ethPriceReducer,
    tokensCount: tokensCountReducer,
    tokensCountByStatus: tokensCountByStatusReducer,
    tokensDeposits: tokensDepositsReducer,
    tokensTotalEth: tokensTotalEthReducer,
    badgesCount: badgesCountReducer,
    badgesCountByStatus: badgesCountByStatusReducer,
    badgesDeposits: badgesDepositsReducer,
    badgesTotalEth: badgesTotalEthReducer,
    crowdfundingTokens: crowdfundingTokensReducer,
    crowdfundingPage: crowdfundingPageReducer
});
