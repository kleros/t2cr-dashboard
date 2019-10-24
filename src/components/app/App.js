import "./App.css";
import Web3 from 'web3';
import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import HomePage from "../pages/HomePage";
import TokensPage from "../pages/TokensPage";
import BadgesPage from "../pages/BadgesPage";
import Footer from "../footer/Footer";
import { 
  fetchEthPrice, 
  fetchTokensCount, 
  fetchTokensCountByStatus, 
  fetchCrowdfundingTokens, 
  fetchTokensDeposits, 
  fetchBadgesCount, 
  fetchBadgesCountByStatus, 
  fetchBadgesDeposits 
} from "../../actions";

class App extends React.Component {

  state = { error: false };
  
  async loadData() {
    const network = await this.getNetworkType();
    this.props.fetchEthPrice();
    this.props.fetchTokensCount(network);
    this.props.fetchTokensCountByStatus(network);
    this.props.fetchTokensDeposits(network);
    this.props.fetchBadgesCount(network);
    this.props.fetchBadgesCountByStatus(network);
    this.props.fetchBadgesDeposits(network);
    this.props.fetchCrowdfundingTokens(network);
  }

  getNetworkType() {
    const web3 = new Web3(Web3.givenProvider);
    return web3.eth.net.getNetworkType();
  }

  componentWillMount() {
    if (Web3.givenProvider) {
      this.loadData();
    } else {
      this.setState({error: true})
    }
  }

  renderError() {
    return (
        <div className="App__ErrorBox">
          <p>ERROR!</p><br/>
          <p>MetaMask browser extension not found!</p>
          <p>Please install the extension and reload the page</p>
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
            <Route path="/" exact component={HomePage} />
            <Route path="/tokens" component={TokensPage} />
            <Route path="/badges" component={BadgesPage} />
          </div>
          <Footer />
        </HashRouter>
      </div>
    );
  }
}

const mapDispatchToProps = { 
  fetchEthPrice, 
  fetchTokensCount, 
  fetchTokensCountByStatus,
  fetchTokensDeposits, 
  fetchBadgesCount, 
  fetchBadgesCountByStatus, 
  fetchBadgesDeposits,
  fetchCrowdfundingTokens,
}

export default connect(null, mapDispatchToProps)(App);