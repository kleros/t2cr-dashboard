import './InfoPanel.css'
import React from 'react'
import { BallPulse } from 'react-pure-loaders'

class InfoPanel extends React.Component {
  renderImage() {
    const { img, imgText, imgWidth, imgHeight, type } = this.props
    return (
      <div className={`InfoPanel__Image InfoPanel__Image--${type}`}>
        <img src={img} alt={imgText} width={imgWidth} height={imgHeight} />
      </div>
    )
  }

  renderValue() {
    const { value } = this.props
    return value ? <p>{value}</p> : <BallPulse color="#FFF" loading />
  }

  render() {
    const { type, label } = this.props
    return (
      <div className={`InfoPanel InfoPanel--${type}`}>
        {this.renderImage()}
        <div className={`InfoPanel__Data InfoPanel__Data--${type}`}>
          <div
            className={`InfoPanel__Data__Value InfoPanel__Data__Value--${type}`}
          >
            {this.renderValue()}
          </div>
          <div
            className={`InfoPanel__Data__Label InfoPanel__Data__Label--${type}`}
          >
            {label}
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel
