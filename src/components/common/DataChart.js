import "./DataChart.css";
import _ from "lodash";
import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { BallPulse } from 'react-pure-loaders';
import prepareDataset from '../../util/prepareDataset';

/*
 * Chart.js configuration object
 */
const chartOptions = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  title: { display: false },
  legend: { display: false },
  tooltips: {
    displayColors: false,
    intersect: false,
    callbacks: {
      // The value on the label of the tooltip should always have two decimal places
      label: function(tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label || "";
        if (label) {
          label += ": ";
        }
        label += tooltipItem.yLabel.toFixed(2);
        return label;
      }
    }
  },
  scales: {
    xAxes: [
      {
        ticks: { fontColor: "white" },
        gridLines: {
          drawOnChartArea: false,
          color: "white"
        }
      }
    ],
    yAxes: [
      {
        ticks: { fontColor: "white" },
        gridLines: {
          drawOnChartArea: false,
          color: "white"
        }
      }
    ]
  }
};


class DataChart extends React.Component {

  getChartData = () => {
    return {
      labels: this.props.dataset.labels,
      lineTension: 1,
      datasets: [
        {
          data: this.props.dataset.data,
          backgroundColor: "black",
          borderColor: "#0588f1",
          fontColor: "#fff"
        }
      ]
    }
  }

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  render() {
    if (!this.props.dataLoaded) {
      return (
        <div className="DataChart">
          <div className="DataChart__Spinner">Loading deposit data</div>
          <div className="DataChart__Spinner"><BallPulse loading/></div> 
        </div>
      );
    }

    return (
        <div className="DataChart">
          <Line
            data={this.getChartData()}
            options={chartOptions}
            redraw={true}
          />
        </div>
    );
  }
};

const mapStateToProps = state => {
  if (state.badgesDeposits == null || state.tokensDeposits == null) {
    return { dataLoaded: false }; 
  }

  const badgesDeposits = [];
  _.forOwn(state.badgesDeposits, function(deposits, badgeAddr) {
        badgesDeposits.push( ...deposits);
  });
  
  const totalDeposits = [...state.tokensDeposits, ...badgesDeposits ];
  
  return {
    dataLoaded: true,
    dataset: prepareDataset(totalDeposits)
  }
}

export default connect(mapStateToProps)(DataChart);