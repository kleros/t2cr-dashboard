import axios from "axios";
import { FETCH_ETH_PRICE } from "./types";

/* 
 * Fetch ETH price 
 */
export const fetchEthPrice = () => async dispatch => {
  const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
  dispatch({ type: FETCH_ETH_PRICE, payload: response.data.ethereum.usd });
};