import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {
  renderWeather(cityData){
    const list = cityData.list;
    const name = cityData.city.name
    const temps = list.map(weather => weather.main.temp);
    console.log(temps);
    const pres = list.map(pres => pres.main.pressure);
    const humi= list.map(humi=> humi.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={temps} units="K" color="orange"/></td>
        <td><Chart data={pres} units="HPA" color="blue"/></td>
        <td><Chart data={humi} units="%" color="red"/></td>
      </tr>
    )
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (HPA)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function MapStateToProps({ weather }) {
  //es6 {weather} in function args = state.weather
  return { weather };//pulling state.weather directly with ES6
}

export default connect(MapStateToProps)(WeatherList);
