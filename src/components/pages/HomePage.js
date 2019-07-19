import './HomePage.css';
import React from 'react';
import DummyDataChart from '../common/DummyDataChart';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from "../common/InfoPanel";
import TwitterFeed from '../common/TwitterFeed';
import Pagination from '../common/Pagination';

import etherImg from '../../assets/images/ether-image.svg';
import currencyImg from '../../assets/images/currency-image.svg';
import zilliqaLogoImg from '../../assets/images/zilliqa-logo.svg';
import binanceImg from '../../assets/images/binance-logo.svg';
import vechainImg from '../../assets/images/vechain-logo.svg';
import omisegoImg from '../../assets/images/omisego-logo.svg';

function HomePage() {
    return (
        <div className="App__Page HomePage">
            
            <InfoPanelWrapper>
                <InfoPanel type="big" img={etherImg} imgText="ETH" label="TOTAL ETH deposited" value="9,000,000"/>
                <InfoPanel type="big" img={currencyImg} imgText="USD" label="TOTAL USD value" value="19,000,000"/>
            </InfoPanelWrapper>

            <DummyDataChart />
            
            <div className="HomePage__Row">
                <div className="HomePage__Column">
                    <InfoPanelWrapper>
                        <InfoPanel type="small" img={zilliqaLogoImg} imgText="Zil" label={`Crowdfunding\nAppeal`} value="Zilliqa - Zil"/>
                        <InfoPanel type="small" img={binanceImg} imgText="BNB" label={`Crowdfunding\nAppeal`} value="Binance - BNB"/>
                        <InfoPanel type="small" img={vechainImg} imgText="Ven" label={`Crowdfunding\nAppeal`} value="VeChain - Ven"/>
                        <InfoPanel type="small" img={omisegoImg} imgText="OMG" label={`Crowdfunding\nAppeal`} value="OmiseGo - OMG"/>
                    </InfoPanelWrapper>
                </div>
                <div>
                    <TwitterFeed />
                </div>
            </div>

            <Pagination/>
        </div>
    );
}

export default HomePage;