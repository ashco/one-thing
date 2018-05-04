import moment from 'moment';
import axios from 'axios';
require('dotenv').config();

const urlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = process.env.API_KEY;

// TIME
export function getCurrentUnix () {
  return Date.now();
}

export function formatMain (unix) {
  return moment(unix).format('dddd, MMM Do');
}

export function formatCard (unix) {
  return moment(unix).format('l');
}

export function sameDateCheck (current, todo) {
  if (typeof todo === undefined) {
    return false;
  }
  const currentDate = formatCard(current);
  const todoDate = formatCard(todo);

  return currentDate === todoDate ? true : false;
}

// Streak Calculator
export function streakCalc (data) {
  const filterData = data.filter(todo => todo.status === true);
  if (filterData.length === 0) {
    return;
  }

  let i = 0;
  while (moment(filterData[i].unix).add(i, 'd').format('l') === moment().format('l')) {
    i++;
    if (i >= filterData.length) {
      break;
    }
  }
  return i;
}

// Local Storage
export function setLocalStorage () {
  return JSON.parse(localStorage.getItem('data')) || [];
}

export function updateLocalStorage (data) {
  localStorage.setItem('data', JSON.stringify(data));
}

// Element Manipulation
export function autoFontSize () {
  const cards = Array.from(document.querySelectorAll('.CardMain'));

  if (cards < 0) {
    return;
  }

  cards.forEach(card => {
    const cardHeight = card.offsetHeight;
    const textContent = card.querySelector('.CardMain--textbox');
    const textMargin = parseInt(window.getComputedStyle(textContent).marginTop) + parseInt(window.getComputedStyle(textContent).marginBottom);
    let textHeight = textContent.offsetHeight;
    let fontSize = 1.5;

    if (cardHeight > 0) {
      while ((textHeight + textMargin) < cardHeight) {
        if (fontSize > 1.5) {
          return;
        }
        fontSize = fontSize + 0.05;
        textContent.style.fontSize = `${fontSize}rem`;
        textHeight = textContent.offsetHeight;
      }

      while ((textHeight + textMargin) > cardHeight) {
        if (fontSize < 0.80) {
          return;
        }
        fontSize = fontSize - 0.05;
        textContent.style.fontSize = `${fontSize}rem`;
        textHeight = textContent.offsetHeight;
      }
    }
  });
}


export function centerHeader () {
  const firstEls = document.querySelectorAll('.first');
  const lastEls = document.querySelectorAll('.last');

  for (let i = 0; i < firstEls.length; i++) {
    const firstLen = firstEls[i].offsetWidth;
    const lastLen = lastEls[i].offsetWidth;
    const dif = firstLen - lastLen;

    firstLen > lastLen
      ? lastEls[i].style.marginRight = `${dif}px`
      : firstEls[i].style.marginLeft = `${-dif}px`;
  }
}

export function getWeatherData (location) {
  return axios.get(urlStart + location + '&APPID=' + apiKey)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('ERROR: ' + error);
      return null;
  });
}

function formatWeatherData (data) {
  return !data ? null : {
    icon: data.weather[0].icon,
    main: data.weather[0].main,
    description: data.weather[0].description,
    temp: data.main.temp,
    name: data.name,
  };
}

export function getWeather (location) {
  return getWeatherData(location)
    .then(data => formatWeatherData(data));
}

export function capitalizer (string) {
  return string
    .split(' ')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}