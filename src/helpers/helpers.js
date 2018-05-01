import moment from 'moment';

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

// Font Size
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