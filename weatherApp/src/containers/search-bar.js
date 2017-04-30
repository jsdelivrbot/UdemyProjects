import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from '../actions/actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({term: event.target.value});
  }
  onFormSubmit(event) {
    //callback function --
    event.preventDefault();
    //fetch weather data
    this.props.fetchWeather(this.state.term);
    this.setState({term: ''});
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
      >
        <div className="input-group">
          <input
            type="text"
            placeholder="Get a five-day forecast in your favourite cities"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="enter a"
          />
        </div>
      </form>
    );
  }
}
function mapDispatchToProps(dispatch) {
  //fetchWeather is an action creator
  return bindActionCreators( {fetchWeather}, dispatch);
}
//pass null as first argument because this container doesn't need any state. Connect() takes the mapDispatchToProps as a second arg.
export default connect(null, mapDispatchToProps)(SearchBar);
