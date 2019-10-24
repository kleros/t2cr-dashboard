import './Pagination.css';
import React from 'react';
import { connect } from 'react-redux';
import arrowLeftImg from '../../assets/images/arrow-left-small.svg';
import dotImg from '../../assets/images/dot.svg';
import arrowRightImg from '../../assets/images/arrow-right-small.svg';
import { nextCrowdfundingPage, previousCrowdfundingPage } from '../../actions';


class Pagination extends React.Component {
    renderPreviousButton() {
        if (this.props.crowdfundingPage === 1) {
            return;
        }
        return <img className="Pagination--Arrow" src={arrowLeftImg}  alt="Previous Page" onClick={() => this.props.previousCrowdfundingPage()} />;
    }

    renderDot() {
        if (this.props.crowdfundingTokens.length >4) {
            return <img src={dotImg} alt="" />;
        }
        return;
    }

    renderNextButton() {
        const totalTokens = this.props.crowdfundingTokens.length;
        if (totalTokens <= this.props.crowdfundingPage * 4) {
            return;
        }
        return <img className="Pagination--Arrow" src={arrowRightImg} alt="Next Page" onClick={() => this.props.nextCrowdfundingPage()} />;
    }
    
    render() {
        if (this.props.crowdfundingTokens.length === 0) {
            return <div></div>;
        }

        return (
            <div className="Pagination">
                {this.renderPreviousButton()}
                {this.renderDot()}
                {this.renderNextButton()}
            </div>
        );
    }
}
const mapStateToProps = ({ crowdfundingPage, crowdfundingTokens }) => {
    return { crowdfundingPage, crowdfundingTokens }
};

export default connect(mapStateToProps, {nextCrowdfundingPage, previousCrowdfundingPage})(Pagination);