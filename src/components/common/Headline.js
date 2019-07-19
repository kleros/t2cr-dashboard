import './Headline.css';
import React from 'react';

function Headline(props) {
    return (
        <div className="Headline">
            <p>{props.text}</p>
        </div>
    );
}

export default Headline;