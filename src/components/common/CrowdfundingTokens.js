import "./CrowdfundingTokens.css";
import React from 'react';
import { connect } from 'react-redux';
import { BallPulse } from 'react-pure-loaders';
import InfoPanelWrapper from "../common/InfoPanelWrapper";
import InfoPanel from "../common/InfoPanel";
import Pagination from '../common/Pagination';
import { IPFS_GATEWAY } from '../../config/ipfs';

class CrowdfundingTokens extends React.Component {
    
    renderCrowdfundingTokens() {
        const  { crowdfundingTokens, crowdfundingPage } = this.props;
        const totalTokens = crowdfundingTokens.length;
        const startIndex = (crowdfundingPage * 4) - 4;
        const endIndex = totalTokens > (crowdfundingPage * 4) ? (crowdfundingPage * 4) - 1 : totalTokens - 1;
        const tokens = []
        for (let i = startIndex; i <= endIndex; i++) {
            const token = crowdfundingTokens[i];
            tokens.push(
                <InfoPanel 
                    key={token.ticker}
                    type="small" 
                    img={`${IPFS_GATEWAY}${token.symbolMultihash}`} 
                    imgWidth="60"
                    imgHeight="60"
                    imgText={token.ticker} 
                    label={`Crowdfunding\nAppeal`} 
                    value={`${token.name} - ${token.ticker}`}
                />
            );
        }
        return tokens;
    }

    render() {
        if (this.props.crowdfundingTokens == null) {
            return (
                <div className="CrowdfundingTokens">
                    <div className="CrowdfundingTokens__Spinner">Loading Crowdfunding Tokens</div>
                    <div className="CrowdfundingTokens__Spinner"><BallPulse loading/></div> 
                </div>
            );
        }

        if (this.props.crowdfundingTokens.length === 0) {
            return (
                <div className="CrowdfundingTokens">
                    <div className="CrowdfundingTokens__Spinner">No Crowdfunding Tokens found!</div>
                </div>
            );
        }

        return (
            <div>
                <InfoPanelWrapper>{this.renderCrowdfundingTokens()}</InfoPanelWrapper>
                <Pagination/>                  
            </div>
        )
    }
}

const mapStateToProps = ({ crowdfundingPage , crowdfundingTokens }) => {
    return { crowdfundingPage , crowdfundingTokens }
};

export default connect(mapStateToProps)(CrowdfundingTokens);