import axios from 'axios';

const API_KEY = '&appid=79f588f806b24a35c244accf8f849251';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?q=`

//action creator: returns an action
export function fetchWeather(city) {
  const url =`${ROOT_URL}${city},ca${API_KEY}`
  const request = axios.get(url);
  //axios returns a promise
  //promise doesn't contain data
  return {
    type: FETCH_WEATHER,
    //payload is the promise -- redux-promise stops the action. Once the promise resolves, it creates a new action that contains only the data. It unpacks the promise.
    payload: request
  }
}
