import web3 from "../util/web3";
import { FETCH_BADGES_COUNT, FETCH_BADGES_COUNT_BY_STATUS } from "./types";
import { DASHBOARD_VIEW_CONTRACT_ABI, DASHBOARD_VIEW_CONTRACT_ADDR } from "../config/dashboard-view-contract";
import { BADGE_CONTRACT_ABI, BADGE_CONTRACT_ADDRS } from "../config/badge-contract";
import { KLEROS_LIQUID_CONTRACT_ADDR } from "../config/kleros-liquid-contract";

/*
 * Action used to fetch the count of badges in all badge contracts
 */
export const fetchBadgesCount = network => async dispatch => {

  // Fetch count for each badge contract
  const countPromises = BADGE_CONTRACT_ADDRS[network].map(badgeContractAddr => {
    return badgeCount(badgeContractAddr);
  });

  // Sum count badges of all contracts
  const countArray = await Promise.all(countPromises);
  const totalCount = countArray.reduce((total, count) => {
    return total + parseInt(count);
  }, 0);
  dispatch({ type: FETCH_BADGES_COUNT, payload: totalCount });
};

/*
 * Helper method used to fetch the count of badges in a given contract
 */
export async function badgeCount(badgeContractAddr) {
  const badgeContract = new web3.eth.Contract(BADGE_CONTRACT_ABI, badgeContractAddr);
  return await badgeContract.methods.addressCount().call();
}

export const fetchBadgesCountByStatus = network => async dispatch => {
  const badgeContractAddrs = BADGE_CONTRACT_ADDRS[network];

  // Fetch count by status for each badge contract
  const countByStatusPromises = badgeContractAddrs.map(badgeContractAddr => {
    return fetchCountByStatusByContract(network, badgeContractAddr);
  });

  // Sum counts by status of all contracts
  const countByStatusArray = await Promise.all(countByStatusPromises);
  const totalCount = countByStatusArray.reduce(
    (results, countByStatus) => {
      results.accepted += parseInt(countByStatus.accepted);
      results.rejected += parseInt(countByStatus.rejected);
      results.pending += parseInt(countByStatus.pending);
      results.challenged += parseInt(countByStatus.challenged);
      results.crowdfunding += parseInt(countByStatus.crowdfunding);
      results.appealed += parseInt(countByStatus.appealed);
      return results;
    }, { accepted: 0, rejected: 0, pending: 0, challenged: 0, crowdfunding: 0, appealed: 0 }
  );
  dispatch({ type: FETCH_BADGES_COUNT_BY_STATUS, payload: totalCount });
};

async function fetchCountByStatusByContract(network, badgeContractAddr) {
  const dashboardContract = new web3.eth.Contract(DASHBOARD_VIEW_CONTRACT_ABI, DASHBOARD_VIEW_CONTRACT_ADDR[network]);
  const klAddr = KLEROS_LIQUID_CONTRACT_ADDR[network];
  
  const badgesCount = await badgeCount(badgeContractAddr);
  const pageSize = 15;
  let pages;
  
  if (badgesCount <= pageSize) {
    pages = 1;
  } else {
    pages = (badgesCount % pageSize) === 0 ? Math.floor(badgesCount / pageSize) : Math.floor((badgesCount / pageSize) + 1);
  }
  
  let cursor = 0;
  let count = 0;

  const countByStatusPromises = [];

  for (let page = 0; page < pages; page++) {
    cursor = page * pageSize;
    count = page < pages - 1 ? pageSize : badgesCount - cursor;
    countByStatusPromises.push(dashboardContract.methods.addressCountByStatus(badgeContractAddr, klAddr, cursor, count).call());
  }

  const countByStatusArray = await Promise.all(countByStatusPromises);

  return countByStatusArray.reduce((results, countByStatus) => {
      results.accepted += parseInt(countByStatus.accepted);
      results.rejected += parseInt(countByStatus.rejected);
      results.pending += parseInt(countByStatus.pending);
      results.challenged += parseInt(countByStatus.challenged);
      results.crowdfunding += parseInt(countByStatus.crowdfunding);
      results.appealed += parseInt(countByStatus.appealed);
      return results;
    }, {accepted: 0, rejected: 0, pending: 0, challenged: 0, crowdfunding: 0, appealed: 0}
  );

}