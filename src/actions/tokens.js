import web3 from "../util/web3";
import { DASHBOARD_VIEW_CONTRACT_ABI, DASHBOARD_VIEW_CONTRACT_ADDR } from "../config/dashboard-view-contract";
import { TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDR } from "../config/token-contract";
import { KLEROS_LIQUID_CONTRACT_ADDR } from "../config/kleros-liquid-contract";
import { FETCH_TOKENS_COUNT, FETCH_TOKENS_COUNT_BY_STATUS } from "./types";

/*
 * Action used to fetch the count of tokens
 */
export const fetchTokensCount = network => async dispatch => {
  const tokenContractAddr = TOKEN_CONTRACT_ADDR[network];
  const tokensCount = await tokenCount(tokenContractAddr);
  dispatch({ type: FETCH_TOKENS_COUNT, payload: tokensCount });
};

/*
 * Helper method used to fetch the count of tokens in a given contract
 */
export async function tokenCount(tokenContractAddr) {
  const tokenContract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, tokenContractAddr);
  return await tokenContract.methods.tokenCount().call();
}

/*
 *
 */
export const fetchTokensCountByStatus = network => async dispatch => {
  const dcAddr = DASHBOARD_VIEW_CONTRACT_ADDR[network]
  const tcAddr = TOKEN_CONTRACT_ADDR[network];
  const klAddr = KLEROS_LIQUID_CONTRACT_ADDR[network];

  const tokenContract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, tcAddr);
  const dashboardContract = new web3.eth.Contract(DASHBOARD_VIEW_CONTRACT_ABI, dcAddr);

  const tokensCount = await tokenContract.methods.tokenCount().call();
  const pageSize = 10;
  let pages;

  if (tokensCount <= pageSize) {
    pages = 1;
  } else {
    pages = (tokensCount % pageSize) === 0 ? Math.floor(tokensCount / pageSize) : Math.floor((tokensCount / pageSize) + 1);
  }

  let cursor = 0;
  let count = 0;

  const tokensCountByStatusPromises = [];

  for (let page = 0; page < pages; page++) {
    cursor = page * pageSize;
    count = page < pages - 1 ? pageSize : tokensCount - cursor;
    tokensCountByStatusPromises.push(dashboardContract.methods.tokenCountByStatus(tcAddr, klAddr, cursor, count).call());
  }

  const tokensCountByStatusArray = await Promise.all(tokensCountByStatusPromises);

  const tokensCountByStatus = tokensCountByStatusArray.reduce((results, countByStatus) => {
      results.accepted += parseInt(countByStatus.accepted);
      results.rejected += parseInt(countByStatus.rejected);
      results.pending += parseInt(countByStatus.pending);
      results.challenged += parseInt(countByStatus.challenged);
      results.crowdfunding += parseInt(countByStatus.crowdfunding);
      results.appealed += parseInt(countByStatus.appealed);
      return results;
    }, {accepted: 0, rejected: 0, pending: 0, challenged: 0, crowdfunding: 0, appealed: 0}
  );

  dispatch({ type: FETCH_TOKENS_COUNT_BY_STATUS, payload: tokensCountByStatus });
};
