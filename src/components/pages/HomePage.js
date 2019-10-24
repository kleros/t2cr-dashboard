import './HomePage.css';
import React from 'react';
import { connect } from "react-redux";
import CrowdfundingTokens from '../common/CrowdfundingTokens';
import DataChart from '../common/DataChart';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from "../common/InfoPanel";
import TwitterFeed from '../common/TwitterFeed';
import etherImg from '../../assets/images/ether-image.svg';
import currencyImg from '../../assets/images/currency-image.svg';

class HomePage extends React.Component {
    render() {
        return (
            <div className="App__Page HomePage">
                <InfoPanelWrapper>
                    <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value={this.props.totalEth} />
                    <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value={this.props.totalUsd} />
                </InfoPanelWrapper>
    
                <DataChart />
                
                <div className="HomePage__Row">
                    <div className="HomePage__Crowdfunding">
                        <CrowdfundingTokens />
                    </div>
                    <div className="HomePage__TwitterFeed">
                        <TwitterFeed /> 
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  const { tokensTotalEth, badgesTotalEth, priceEth } = state;

  if (tokensTotalEth == null || badgesTotalEth == null || priceEth == null) {
      return {
          totalEth: null,
          totalUsd: null
      }
  }

  const totalEth = tokensTotalEth + badgesTotalEth;
  const totalUsd = totalEth * priceEth;
  
  return {
    totalEth: parseFloat(Math.round(totalEth * 100) / 100).toFixed(2),
    totalUsd: parseFloat(Math.round(totalUsd * 100) / 100).toFixed(2),
  };
};

export default connect(mapStateToProps)(HomePage);