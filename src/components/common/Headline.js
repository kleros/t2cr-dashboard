import './Headline.css';
import React from 'react';
import { BallPulse } from 'react-pure-loaders';

class Headline extends React.Component  {
    
    renderMessage() {
        if (this.props.text == null) {
            return <div className="DataChart__Spinner"><BallPulse loading/></div> 
        }
        return  <p>{this.props.text}</p>
    }
    
    render() {
        return (
            <div className="Headline">
                { this.renderMessage() }
            </div>
        );
    }
    
}

export default Headline;