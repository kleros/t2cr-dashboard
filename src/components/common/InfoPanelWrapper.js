import './InfoPanelWrapper.css';
import React from 'react';

function InfoPanelWrapper(props) {
    return (
        <div className="InfoPanelWrapper">
            {props.children}
        </div>
    );
}

export default InfoPanelWrapper;