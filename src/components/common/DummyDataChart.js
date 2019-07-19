import React from 'react';
import demoChart from '../../assets/images/demo-chart.svg';

const wrapperStyle = {
    position: 'relative',
    textAlign: 'center',
    margin: '40px'
};

const imgStyle = {
    margin: 'auto',
};

function DummyDataChart() {
    return (
        <div style={wrapperStyle}>
            <img src={demoChart} alt="Demo chart" style={imgStyle} />
        </div>  
    );
};

export default DummyDataChart;