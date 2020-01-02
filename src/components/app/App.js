import "./App.css";
import Web3 from "web3";
import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import HomePage from "../pages/HomePage";
import TokensPage from "../pages/TokensPage";
import BadgesPage from "../pages/BadgesPage";
import Footer from "../footer/Footer";
import { fetchDepositData, fetchEthPrice, fetchTokensCountByStatus, fetchBadgesCountByStatus, fetchCrowdfundingTokens } from "../../actions";

class App extends React.Component {
  state = { error: false };

  loadData = async () => {
    const { network } = this.state
    this.props.fetchDepositData(network);
    this.props.fetchEthPrice();
    this.props.fetchTokensCountByStatus(network);
    this.props.fetchBadgesCountByStatus(network);
    this.props.fetchCrowdfundingTokens(network);
  }

  componentWillMount = async () => {
    let network = 'main';  
    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);
      network = await web3.eth.net.getNetworkType();
    }
    if (network !== 'main' && network !== 'kovan') {
      this.setState({ error: true });
      return;
    }
    this.setState({ network });
    this.loadData();
    setTimeout(this.loadData, 30000);
  }

  renderError() {
    return (
      <div className="App__ErrorBox">
        <p>ERROR!</p>
        <br />
        <p>Dashboard is only available in Ethereum mainnet or Kovan testnet</p>
        <p>Please connect to one of these networks with your MetaMask browser extension</p>
      </div>
    );
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }
    return (
      <div className="App">
        <HashRouter>
          <div className="App__Row">
            <SideBar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/tokens" component={TokensPage} />
              <Route path="/badges" component={BadgesPage} />
            </Switch>
          </div>
          <Footer />
        </HashRouter>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchDepositData,
  fetchEthPrice,
  fetchTokensCountByStatus,
  fetchBadgesCountByStatus,
  fetchCrowdfundingTokens
};

export default connect(null, mapDispatchToProps)(App);
