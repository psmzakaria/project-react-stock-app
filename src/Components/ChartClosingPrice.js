import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs";
import { chartOptions } from "./chart-settings";
import { chartDataSeed } from "../SeedData/chart-data";
import { jsonDataAAPL } from "../SeedData/chart-data-aapl";

class ChartClosingPrice extends Component {
  constructor() {
    super();
    this.state = {
      chartLoaded: false,
      chartData: {
        labels: [],
        datasets: []
      }
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.formatData(jsonDataAAPL)
    });
    this.setState({
      chartLoaded: true
    });
  }

  render() {
    if (this.state.chartLoaded) {
      return (
        <LineChart
          data={this.state.chartData}
          options={chartOptions}
          //   width={'600px'}
          //   height={'250px'}
        />
      );
    } else return <div />;
  }

  formatData = rawJSONData => {
    const converted = this.getDailyData(rawJSONData);
    console.log(converted);

    const chartWrapper = {
      labels: [],
      datasets: []
    };

    const returnObject = {
      fillColor: "pink",
      strokeColor: "red",
      pointColor: "red",
      pointStrokeColor: "red",
      pointHighlightFill: "red",
      pointHighlightStroke: "red"
    };
    returnObject.label = converted.label;
    returnObject.data = converted.closingPrices;

    chartWrapper.labels = converted.dates;
    chartWrapper.datasets.push(returnObject);

    console.log(chartWrapper);
    return {
        ...chartDataSeed,
        ...chartWrapper
    };
  };

  getDailyData = json => {
    const dates = [];
    const closingPrices = [];
    Object.entries(json["Time Series (Daily)"]).forEach(
      (dailyData, index, json) => {
        dates.push(dailyData[0]);
        closingPrices.push(dailyData[1]["4. close"]);
        return {
          date: dailyData[0],
          closingPrice: dailyData[1]["4. close"]
        };
      }
    );
    return {
        label: json['Meta Data']['2. Symbol'],
        dates: dates,
        closingPrices: closingPrices
    };
  };
}

export default ChartClosingPrice;
