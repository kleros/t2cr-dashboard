import React from 'react';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from "../common/InfoPanel";
import etherImg from '../../assets/images/ether-image.svg';
import currencyImg from '../../assets/images/currency-image.svg';
import acceptedImg from '../../assets/images/accepted-image.svg';
import rejectedTokenImg from '../../assets/images/rejected-token.svg';

function TokensPage() {
    return (
        <div className="App__Page TokensPage">
            <InfoPanelWrapper>
                <InfoPanel type="big" img={etherImg} label="TOTAL ETH deposited" value="9,000,000"/>
                <InfoPanel type="big" img={currencyImg} label="TOTAL USD value" value="19,000,000"/>
            </InfoPanelWrapper>

            <InfoPanelWrapper>
                <InfoPanel type="medium" img={acceptedImg} label="Accepted" value="41,563"/>
                <InfoPanel type="medium" img={rejectedTokenImg} label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={rejectedTokenImg} label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={rejectedTokenImg} label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={rejectedTokenImg} label="Rejected" value="1,237"/>
                <InfoPanel type="medium" img={rejectedTokenImg} label="Rejected" value="1,237"/>
            </InfoPanelWrapper>
        </div>
    );
}

export default TokensPage;