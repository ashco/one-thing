import moment from 'moment';
import axios from 'axios';

const quoteUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en';

// TIME
export function getCurrentUnix () {
  return Date.now();
}

export function formatMain (unix) {
  return moment(unix).format("dddd, MMM Do");
}

export function formatCard (unix) {
  return moment(unix).format("MMMM Do YYYY");
}

export function sameDateCheck (current, todo) {
  if (typeof todo === undefined) {
    return false
  }
  const currentDate = formatCard(current);
  const todoDate = formatCard(todo);

  return currentDate === todoDate ? true : false;
}

// API
export function getQuote () {
  axios.get(quoteUrl)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.warn(error);
    })
}
