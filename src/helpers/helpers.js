import moment from 'moment';
import axios from 'axios';

// http://api.openweathermap.org/data/2.5/forecast?q=Seattle,Washington&APPID=d706246e45952ae604390e0e530c6603
const urlStart = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'd706246e45952ae604390e0e530c6603';

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
  const containerWidth = document.querySelector('.Main--header').offsetWidth;

  for (let i = 0; i < firstEls.length; i++) {
    const firstLen = firstEls[i].offsetWidth;
    const lastLen = lastEls[i].offsetWidth;
    const dif = firstLen - lastLen;

    firstLen > lastLen
      ? lastEls[i].style.marginRight = `${dif}px`
      : firstEls[i].style.marginLeft = `${-dif}px`;
  }
}

// export function animateBtn () {
//   const btnX = document.querySelector('.Main .btn-del');
//   const btnChk = document.querySelector('.Main .btn-chk');
//   const widthBtnX = btnX.offsetWidth;
//   const widthBtnChk = btnChk.offsetWidth;
//   const dif = widthBtnX - widthBtnChk;

//   if (widthBtnX > widthBtnChk) {
//     btnChk.style.marginRight = `${dif}px`;
//     btnX.style.marginLeft = '0px';
//     btnChk.innerHTML = '✓';
//     btnX.innerHTML = '<span class="Main-btn__hover">Delete?</span><span>✕</span>';
//     // btnX.innerHTML = 'Delete?  ✕';
//   }
//   else if (widthBtnX < widthBtnChk) {
//     btnChk.style.marginRight = '0px';
//     btnX.style.marginLeft = `${-dif}px`;
//     // btnChk.innerHTML = '✓  Complete!';
//     btnChk.innerHTML = '<span>✓</span><span class="Main-btn__hover">Complete!</span>';
//     btnX.innerHTML = '✕';
//   }
//   else {
//     btnChk.style.marginRight = '0px';
//     btnX.style.marginLeft = '0px';
//     btnChk.innerHTML = '✓';
//     btnX.innerHTML = '✕';
//   }
// }

export function getWeatherData (location) {
  return axios.get(urlStart + location + '&APPID=' + apiKey)
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.log('ERROR: ' + error);
      return null;
    })
}
