import moment from 'moment';

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