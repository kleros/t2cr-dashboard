import './Pagination.css';
import React from 'react';
import arrowLeftImg from '../../assets/images/arrow-left-small.svg';
import dotImg from '../../assets/images/dot.svg';
import arrowRightImg from '../../assets/images/arrow-right-small.svg';

function Pagination() {
    return (
        <div className="Pagination">
            <img src={arrowLeftImg} alt="Previous Page"/>
            <img src={dotImg} alt="" />
            <img src={arrowRightImg} alt="Next Page"/>
        </div>
    );
}

export default Pagination;