import './InfoPanel.css';
import React from 'react';
import { BallPulse } from 'react-pure-loaders';

class InfoPanel extends React.Component {
    renderImage() {
        return (
            <div className={`InfoPanel__Image InfoPanel__Image--${this.props.type}`}>
                <img 
                    src={this.props.img} 
                    alt={this.props.imgText} 
                    width={this.props.imgWidth} 
                    height={this.props.imgHeight} 
                />
            </div>
        );
    }

    renderValue() {
        return this.props.value != null ? <p>{this.props.value}</p> : <BallPulse color="#FFF" loading /> ;
    }

    render () {
        return (
            <div className={`InfoPanel InfoPanel--${this.props.type}`}>
                { this.renderImage() }    
                <div className={`InfoPanel__Data InfoPanel__Data--${this.props.type}`}>
                    <div className={`InfoPanel__Data__Value InfoPanel__Data__Value--${this.props.type}`}>
                        {this.renderValue()}
                    </div>
                    <div className={`InfoPanel__Data__Label InfoPanel__Data__Label--${this.props.type}`}>
                        {this.props.label}
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPanel;
