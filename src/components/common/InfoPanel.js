import './InfoPanel.css';
import React from 'react';

class InfoPanel extends React.Component {
    renderImage() {
        return (
            <div className="InfoPanel__Image">
                <img src={this.props.img} alt="Ether Logo"/>
            </div>
        );
    }

    render () {
        return (
            <div className={`InfoPanel InfoPanel--${this.props.type}`}>
                { this.renderImage() }    
                <div className={`InfoPanel__Data InfoPanel__Data--${this.props.type}`}>
                    <div className={`InfoPanel__Data__Value InfoPanel__Data__Value--${this.props.type}`}>
                        <p>{this.props.value}</p>
                    </div>
                    <div className={`InfoPanel__Data__Label InfoPanel__Data__Label--${this.props.type}`}>
                        <p>{this.props.label}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPanel;
