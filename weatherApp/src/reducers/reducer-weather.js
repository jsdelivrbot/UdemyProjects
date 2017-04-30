import { FETCH_WEATHER } from '../actions/actions';

export default function WeatherReducer(state = [], action) {
  console.log('Action recieved:', action);
  switch (action.type) {
    case FETCH_WEATHER:
      //using concat instead of push means we're not mutating state, but returning a new version of state.
      // return state.concat([action.payload.data]);
      //ES6 version
      return [ action.payload.data, ...state ]; // [city,city,city]
  }
  return state;
}
