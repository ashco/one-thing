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
  return moment(unix).format("l");
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

// Font Size

export function autoFontSize () {
  const cards = Array.from(document.querySelectorAll('.CardMain'));

  if (cards < 0) {
    console.log('NO CARDS');
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
        if (fontSize < 0.9) {
          return;
        }
        fontSize = fontSize - 0.05;
        textContent.style.fontSize = `${fontSize}rem`;
        textHeight = textContent.offsetHeight;
      }


    }
  })
}