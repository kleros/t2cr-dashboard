import "./App.css";
import "./BurgerMenu.css";
import Web3 from "web3";
import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch, NavLink } from "react-router-dom";
import { slide as ReactBurgerMenu } from 'react-burger-menu'
import SideBar from "../sidebar/SideBar";
import Logo from "../sidebar/Logo";
import HomePage from "../pages/HomePage";
import TokensPage from "../pages/TokensPage";
import BadgesPage from "../pages/BadgesPage";
import Footer from "../footer/Footer";
import bannerImg from "../../assets/images/banner.png"
import { fetchDepositData, fetchEthPrice, fetchTokensCountByStatus, fetchBadgesCountByStatus, fetchCrowdfundingTokens } from "../../actions";

class App extends React.Component {
  state = { error: false, menuOpen: false };

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

  handleStateChange(state) {
    const { isOpen } = state
    this.setState({ menuOpen: isOpen })
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
          <div className="App__Row" id="outer-container">
            <ReactBurgerMenu
              outerContainerId="outer-container"
              pageWrapId="page-wrap"
              width={307}
              isOpen={this.state.menuOpen}
              onStateChange={state => this.handleStateChange(state)}
            >
              <Logo />
              <br />
              <NavLink
                onClick={() => this.setState({menuOpen: false})}
                className="NavBar__NavItem"
                activeClassName="NavBar__NavItem--active"
                to="/"
                exact
              >Home</NavLink>
              <NavLink
                onClick={() => this.setState({menuOpen: false})}
                className="NavBar__NavItem"
                activeClassName="NavBar__NavItem--active"
                to="/tokens">Tokens</NavLink>
              <NavLink
                onClick={() => this.setState({menuOpen: false})}
                className="NavBar__NavItem"
                activeClassName="NavBar__NavItem--active"
                to="/badges">Badges</NavLink>
              <div className="SideBar__Banner">
                <a href="https://tokens.kleros.io/"><img src={bannerImg} alt="Banner"/></a>
              </div>
            </ReactBurgerMenu >
            <SideBar />
            <div id="page-wrap">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/tokens" component={TokensPage} />
                <Route path="/badges" component={BadgesPage} />
              </Switch>
            </div>
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
