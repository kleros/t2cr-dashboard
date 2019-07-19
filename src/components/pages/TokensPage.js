import React from 'react';
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

function TokensPage() {
    return (
        <div className="App__Page TokensPage">
            <InfoPanelWrapper>
                <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value="9,000,000"/>
                <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value="19,000,000"/>
            </InfoPanelWrapper>

            <Headline text="49,213 Token Submissions" />

            <InfoPanelWrapper>
                <InfoPanel type="medium" img={tokenAcceptedImg} imgText="Accepted" label="Accepted" value="941,563"/>
                <InfoPanel type="medium" img={tokenRejectedImg} imgText="Rejected" label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={tokenCrowdfundingImg} imgText="Crowdfunding" label="Crowdfunding" value="1,237"/>
                <InfoPanel type="medium" img={tokenPendingImg} imgText="Pending" label="Pending" value="234"/>
                <InfoPanel type="medium" img={tokenChallengedImg} imgText="Challenged" label="Challenged" value="2,003"/>
                <InfoPanel type="medium" img={tokenAppealedImg} imgText="Appealed" label="Appealed" value="1,237"/>
            </InfoPanelWrapper>
        </div>
    );
}

export default TokensPage;