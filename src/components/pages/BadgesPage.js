import React from 'react';
import { connect } from "react-redux";
import Headline from '../common/Headline';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from '../common/InfoPanel';
import etherImg from '../../assets/images/ether-image.svg';
import currencyImg from '../../assets/images/currency-image.svg';
import badgeAcceptedImg from '../../assets/images/badge-accepted-icon.svg';
import badgeRejectedImg from '../../assets/images/badge-rejected-icon.svg';
import badgeCrowdfundingImg from '../../assets/images/badge-crowdfunding-icon.svg';
import badgePendingImg from '../../assets/images/badge-pending-icon.svg';
import badgeChallengedImg from '../../assets/images/badge-challenged-icon.svg';
import badgeAppealedImg from '../../assets/images/badge-apealed-icon.svg';

class BadgesPage extends React.Component {

    render() {
        const { accepted, rejected, crowdfunding, pending, challenged, appealed, total } = this.props.badgesCountByStatus;
        return (
            <div className="App__Page BadgesPage">
                <InfoPanelWrapper>
                    <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value={this.props.badgesTotalEth} />
                    <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value={this.props.badgesTotalUsd} />
                </InfoPanelWrapper>
    
                <Headline text={ total ? `${total} Badges Added` : null } />
    
                <InfoPanelWrapper>
                    <InfoPanel type="badge" img={badgeAcceptedImg} imgText="Accepted" label="Accepted" value={accepted} />
                    <InfoPanel type="badge" img={badgeRejectedImg} imgText="Rejected" label="Rejected" value={rejected} />
                    <InfoPanel type="badge" img={badgeCrowdfundingImg} imgText="Crowdfunding" label="Crowdfunding" value={crowdfunding} />
                    <InfoPanel type="badge" img={badgePendingImg} imgText="Pending" label="Pending" value={pending} />
                    <InfoPanel type="badge" img={badgeChallengedImg} imgText="Challenged" label="Challenged" value={challenged} />
                    <InfoPanel type="badge" img={badgeAppealedImg} imgText="Appealed" label="Appealed" value={appealed} />
                </InfoPanelWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let badgesTotalEth = null;
    let badgesTotalUsd = null;
    
    const { badgesCountByStatus, depositData, priceEth } = state;
 
    if (depositData !== null && priceEth !== null) {
        badgesTotalUsd = parseFloat(Math.round(depositData.badgesTotalEth * priceEth * 100) / 100).toFixed(2)
        badgesTotalEth = parseFloat(Math.round(depositData.badgesTotalEth * 100) / 100).toFixed(2);
    }

    return { badgesCountByStatus, badgesTotalEth, badgesTotalUsd };
};
  
export default connect(mapStateToProps)(BadgesPage);
