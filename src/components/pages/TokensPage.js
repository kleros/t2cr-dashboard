import React from 'react';
import { connect } from 'react-redux';
import Headline from './../common/Headline';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from "../common/InfoPanel";
import etherImg from '../../assets/images/ether-image.svg';
import currencyImg from '../../assets/images/currency-image.svg';
import tokenAcceptedImg from '../../assets/images/token-accepted-icon.svg';
import tokenRejectedImg from '../../assets/images/token-rejected-icon.svg';
import tokenCrowdfundingImg from '../../assets/images/token-crowdfunding-icon.svg';
import tokenPendingImg from '../../assets/images/token-pending-icon.svg';
import tokenChallengedImg from '../../assets/images/token-challenged-icon.svg';
import tokenAppealedImg from '../../assets/images/token-appealed-icon.svg';

class TokensPage extends React.Component {

    render() {
        const { accepted, rejected, crowdfunding, pending, challenged, appealed } = this.props.tokensCountByStatus;

        return (
            <div className="App__Page TokensPage">
                <InfoPanelWrapper>
                    <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value={this.props.tokensTotalEth} />
                    <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value={this.props.tokensTotalUsd} />
                </InfoPanelWrapper>
    
                <Headline text={ this.props.tokensCount != null  ? `${this.props.tokensCount} Token Submissions` : null } />
    
                <InfoPanelWrapper>
                    <InfoPanel type="medium" img={tokenAcceptedImg} imgText="Accepted" label="Accepted" value={accepted}/>
                    <InfoPanel type="medium" img={tokenRejectedImg} imgText="Rejected" label="Rejected" value={rejected}/>
                    <InfoPanel type="medium" img={tokenCrowdfundingImg} imgText="Crowdfunding" label="Crowdfunding" value={crowdfunding}/>
                    <InfoPanel type="medium" img={tokenPendingImg} imgText="Pending" label="Pending" value={pending}/>
                    <InfoPanel type="medium" img={tokenChallengedImg} imgText="Challenged" label="Challenged" value={challenged}/>
                    <InfoPanel type="medium" img={tokenAppealedImg} imgText="Appealed" label="Appealed" value={appealed}/>
                </InfoPanelWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
  let { tokensCount, tokensCountByStatus, tokensTotalEth, priceEth } = state;
  let tokensTotalUsd = null;

  if (tokensTotalEth != null && priceEth != null) {
    tokensTotalUsd = parseFloat(Math.round(tokensTotalEth * priceEth * 100) / 100).toFixed(2)
    tokensTotalEth = parseFloat(Math.round(tokensTotalEth * 100) / 100).toFixed(2);
  }
  
  return { tokensCount, tokensCountByStatus, tokensTotalEth, tokensTotalUsd };
};

export default connect(mapStateToProps)(TokensPage);