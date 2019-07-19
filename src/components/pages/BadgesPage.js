import React from 'react';
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

function BadgesPage() {
    return (
        <div className="App__Page BadgesPage">
            <InfoPanelWrapper>
                <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value="9,000,000"/>
                <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value="19,000,000"/>
            </InfoPanelWrapper>

            <Headline text="12,234 Badges Added" />

            <InfoPanelWrapper>
                <InfoPanel type="medium" img={badgeAcceptedImg} imgText="Accepted" label="Accepted" value="941,563"/>
                <InfoPanel type="medium" img={badgeRejectedImg} imgText="Rejected" label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={badgeCrowdfundingImg} imgText="Crowdfunding" label="Crowdfunding" value="1,237"/>
                <InfoPanel type="medium" img={badgePendingImg} imgText="Pending" label="Pending" value="234"/>
                <InfoPanel type="medium" img={badgeChallengedImg} imgText="Challenged" label="Challenged" value="2,003"/>
                <InfoPanel type="medium" img={badgeAppealedImg} imgText="Appealed" label="Appealed" value="1,237"/>
            </InfoPanelWrapper>
        </div>
    );
}

export default BadgesPage;