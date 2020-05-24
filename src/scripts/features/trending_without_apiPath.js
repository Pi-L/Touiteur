import * as util from './utilities.js';

const trendingList = document.querySelector('.tt-trending__list');
const mediaQuerySmall = 'screen and (max-width: 600px)';

export function sortTrending(words) {
  let trendingArray = [];
  const screenMatchingMQ = window.matchMedia(mediaQuerySmall);

  const smallWords = ['the', 'pour', 'avec', 'les', 'des', 'mes', 'vous', 'nous', 'them', 'more', 'then', 'than', 'alors', 'donc', 'pas', 'une', 'you', 'ses', 'ces', 'ont', 'tout', 'dans', 'est', 'sum', 'did', 'with', 'and', 'any'];

  trendingArray = Object.entries(words).filter(([word]) => smallWords.every((small) => small !== word)
  );

  if (trendingArray.length > 1) {
    trendingArray.sort((a, b) => b[1] - a[1]);

    if (trendingArray.length > 18) trendingArray.length = 18;

    if (screenMatchingMQ.matches && trendingArray.length > 9) trendingArray.length = 9;

    const arrayTier = Math.ceil(trendingArray.length / 3);

    for (let i = 0; i < trendingArray.length && i < arrayTier; i++) {
      trendingArray[i][1] = 'big';
    }
    for (let i = arrayTier; i < trendingArray.length && i < arrayTier * 2; i++) {
      trendingArray[i][1] = 'medium';
    }
    for (let i = arrayTier * 2; i < trendingArray.length; i++) {
      trendingArray[i][1] = 'small';
    }
    return util.shuffleArray(trendingArray);
  }
  return false;
}

export function setTrending(wordsArray) {
  wordsArray.map(([word, label]) => {
    const trendingWord = document.createElement('li');
    trendingList.appendChild(trendingWord).textContent = word;
    trendingWord.classList.add('tt-trending__word', label);
    return null;
  });
}

export function getTrending() {
  fetch(`<api>/trending`)
    .then((response) => {
      return response.json();
    })
    .then((trending) => {
      trendingList.textContent = '';

      if (Object.keys(trending).length > 0) {
        const sortedArray = sortTrending(trending);
        if (sortedArray) setTrending(sortedArray)
        else {
          const trendingWord = document.createElement('li');
          trendingList.appendChild(trendingWord).textContent = 'Empty';
          trendingWord.classList.add('tt-trending__word', 'big');
        }
      }
      else {
        const trendingWord = document.createElement('li');
        trendingList.appendChild(trendingWord).textContent = 'Empty';
        trendingWord.classList.add('tt-trending__word', 'big');
      }
    }
    )
    .catch((error) => console.error('error in getTrendingTwits() : ', error));
}
