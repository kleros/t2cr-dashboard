import web3 from "../util/web3";
import { FETCH_CROWDFUNDING_TOKENS, CROWDFUNDING_PAGE_NEXT, CROWDFUNDING_PAGE_PREVIOUS } from "./types";
import { DASHBOARD_VIEW_CONTRACT_ADDR, DASHBOARD_VIEW_CONTRACT_ABI } from "../config/dashboard-view-contract";
import { TOKEN_CONTRACT_ADDR } from "../config/token-contract";
import { BADGE_CONTRACT_ADDRS } from "../config/badge-contract";
import { KLEROS_LIQUID_CONTRACT_ADDR } from "../config/kleros-liquid-contract";
import { tokenCount } from "./tokens";
import { badgeCount } from "./badges";

export const fetchCrowdfundingTokens = network => async dispatch => {
  // Smart contract addresses
  const dashboardContractAddr = DASHBOARD_VIEW_CONTRACT_ADDR[network];
  const tokenContractAddr = TOKEN_CONTRACT_ADDR[network];
  const klerosLiquidAddr = KLEROS_LIQUID_CONTRACT_ADDR[network];

  const dashboardContract = new web3.eth.Contract(DASHBOARD_VIEW_CONTRACT_ABI, dashboardContractAddr);

  /*
   * Array containing array with promises for crowdfunding tokens
   */
  const crowdfundingTokensPromises = [];

  // Crowdfunding tokens in tcr contract
  crowdfundingTokensPromises.push(getCrowdfundingTokens(dashboardContract, tokenContractAddr, klerosLiquidAddr));

  // Crowdfunding tokens in badge contracts
  BADGE_CONTRACT_ADDRS[network].forEach(badgeContractAddr => {
    crowdfundingTokensPromises.push(getCrowdfundingAddresses(dashboardContract, badgeContractAddr, tokenContractAddr, klerosLiquidAddr));
  });

  const crowdfundingTokensArrays = await Promise.all(crowdfundingTokensPromises);

  // Create one single array with all the crowdfunding tokens
  const crowdfundingTokens = crowdfundingTokensArrays.reduce((result, crowdfundingTokensArray) => {
      for (let i = 0; i < crowdfundingTokensArray.length; i++) {
        /*
         * Each element of this array mirrors the responses from the T2CR Dashboard Contract.
         * Because of limitations of Solidity, the T2CR Dashboard Contract can not return an array
         * with variable size, so the solution was to return always a fixed size array of 100 
         * elements and the count of valid elements as an extra field. The code bellow handles that
         * extracting only the valid elements returned in the array. For more implementation details
         * please see the source code of the T2CR Dashboard Contract
         */
        const returnedArray = crowdfundingTokensArray[i];
        for (let j = 0; j < parseInt(returnedArray.count); j++) {
          result.push(returnedArray.tokens[j]);
        }
      }
      return result;
    }, [] // The initial value for the reduce function is an empty array
  );

  dispatch({ type: FETCH_CROWDFUNDING_TOKENS, payload: crowdfundingTokens });
};

/* 
 * Helper function to fetch crowdfunding tokens
 */
async function getCrowdfundingTokens(dashboardContract, tokenContractAddr, klerosLiquidAddr) {
  const tokensCount = await tokenCount(tokenContractAddr);

  const pageSize = 15;

  let pages;
  if (tokensCount <= pageSize) {
    pages = 1;
  } else {
    pages = tokensCount % pageSize === 0 ? Math.floor(tokensCount / pageSize) : Math.floor(tokensCount / pageSize + 1);
  }

  let cursor = 0;
  let count = 0;

  const tokensPromises = [];
  for (let page = 0; page < pages; page++) {
    cursor = page * pageSize;
    count = page < pages - 1 ? pageSize : tokensCount - cursor;
    tokensPromises.push(dashboardContract.methods.getCrowdfundingTokens(tokenContractAddr, klerosLiquidAddr, cursor, count).call());
  }

  const tokensArray = await Promise.all(tokensPromises);
  return tokensArray;
}

/* 
 * Helper function to get crowdfunding addresses
 */
async function getCrowdfundingAddresses(dashboardContract, badgeContractAddr, tokenContractAddr, klerosLiquidAddr) {
  const addrsCount = await badgeCount(badgeContractAddr);

  const pageSize = 15;

  let pages;
  if (addrsCount <= pageSize) {
    pages = 1;
  } else {
    pages = addrsCount % pageSize === 0 ? Math.floor(addrsCount / pageSize) : Math.floor(addrsCount / pageSize + 1);
  }

  let cursor = 0;
  let count = 0;

  const addrsPromises = [];
  for (let page = 0; page < pages; page++) {
    cursor = page * pageSize;
    count = page < pages - 1 ? pageSize : addrsCount - cursor;
    addrsPromises.push(dashboardContract.methods.getCrowdfundingAddresses(badgeContractAddr, tokenContractAddr, klerosLiquidAddr, cursor, count).call());
  }

  const addrsArray = await Promise.all(addrsPromises);
  return addrsArray;
}

export const nextCrowdfundingPage = () => {
  return { type: CROWDFUNDING_PAGE_NEXT };
};

export const previousCrowdfundingPage = () => {
  return { type: CROWDFUNDING_PAGE_PREVIOUS };
};
