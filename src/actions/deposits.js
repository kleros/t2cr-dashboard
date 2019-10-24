import axios from "axios";
import { FETCH_TOKENS_DEPOSITS, FETCH_BADGES_DEPOSITS } from "./types";
import { TOKEN_CONTRACT_ADDR } from "../config/token-contract";
import { BADGE_CONTRACT_ADDRS } from "../config/badge-contract";

/*
 * Helper function to fetch all transactions by account using Etherscan account api
 * TODO: replace for a valid api key token
 */
async function fetchTransactions(network, address) {
  const url = (network === "main") ? "https://api.etherscan.io/api" : `https://api-${network}.etherscan.io/api`;
 
  // The api returns a maximum of 10000 transactions per call/page, so this value is used as the offset
  const offset = 10000;
  let page = 1;
  let hasMorePages = true;
  
  const rawTxs = [];

  while (hasMorePages) {
      const pageTxs = await fetchTransactionsPage(url, address, page, offset)
      rawTxs.push(...pageTxs);
      
      if (pageTxs.length !== offset) {
        hasMorePages = false;
        break;
      }

      page++;
  }

  const txs = rawTxs.filter(rawTx => {
    // Remove outgoing transactions
    if (rawTx.from === address) {
      return false;
    }

    // Remove transactions with non-positive value
    if (parseFloat(rawTx.value) <= 0) {
      return false;
    }

    // Remove failed transactions
    if (parseInt(rawTx.txreceipt_status) === 0) {
      return false;
    }

    return true;
  });

  /*
   * Keep only data required by dashboard
   * Convert strings to proper numeric values
   */
  return txs.map(tx => {
    return {
      timeStamp: parseInt(tx.timeStamp),
      from: tx.from,
      value: parseFloat(tx.value)
    };
  });
}

/*
 * Helper function to fetch a page of transactions
 */
async function fetchTransactionsPage(url, address, page, offset) {
  const response = await axios.get(url, {
    params: {
      module: "account",
      action: "txlist",
      address: address,
      page,
      offset: offset,
      sort: "asc",
      apikey: "YourApiKeyToken"
    }
  });
  return response.data.result;
}

/*
 * Fetch deposits to t2cr contract
 */
export const fetchTokensDeposits = network => async dispatch => {
  const txs = await fetchTransactions(network, TOKEN_CONTRACT_ADDR[network]);
  dispatch({ type: FETCH_TOKENS_DEPOSITS, payload: txs });
};

/*
 * Fetch deposits to badges contracts
 */
export const fetchBadgesDeposits = network => async dispatch => {
  const badgeContractAddrs = BADGE_CONTRACT_ADDRS[network];

  // Fetch transactions for each badge contract
  const txsPromises = badgeContractAddrs.map(badgeContractAddr => {
    return fetchTransactions(network, badgeContractAddr);
  });
  const txs = await Promise.all(txsPromises);

  /*
   * Object with deposits to each badge contract
   * The key is the address of the badge contract
   * The value is an array with the deposits
   */
  const depositsByBadge = {};
  for (let i = 0; i < badgeContractAddrs.length; i++) {
    depositsByBadge[badgeContractAddrs[i]] = txs[i];
  }

  dispatch({ type: FETCH_BADGES_DEPOSITS, payload: depositsByBadge });
};
