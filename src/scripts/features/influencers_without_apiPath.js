import * as glob from './global.js';

// Influencers
// --------------------------------------------------------------
const influencersContainer = document.querySelector('.tt-influencers');

export function setInfluencers() {

  influencersContainer.textContent = '';

  glob.arrayOfTwits.influenceurs.map(([name, messages, comments]) => {

    const anInfluencerCard = document.createElement('ul');
    anInfluencerCard.classList.add('tt-influencers__card')
    const anInfluencerName = document.createElement('li');
    anInfluencerName.textContent = name;

    const anInfluencerNbMessages = document.createElement('li');
    anInfluencerNbMessages.textContent = `Nb messages : ${messages}`;

    const anInfluencerNbComment = document.createElement('li'); anInfluencerNbComment.textContent = `Nb comments : ${comments}`;

    anInfluencerCard.append(anInfluencerName, anInfluencerNbMessages, anInfluencerNbComment);

    influencersContainer.appendChild(anInfluencerCard);
  });
}

export function insertBadgeInflu() {
  if (glob.arrayOfTwits.influenceurs.length > 0) {

    glob.arrayOfTwits.twits.map((twit) => {

      if (glob.arrayOfTwits.influenceurs.some(([name]) => name === twit.pseudo)) {
        twit.insertBadge();
      }
      else {
        twit.removeBadge();
      }
    })
  }
}


export function getInfluencers() {
  fetch(`<api>/influencers?count=42`)
    .then((response) => {
      return response.json();
    })
    .then((influencers) => {
      if (Object.keys(influencers.influencers).length > 0) {

        glob.arrayOfTwits.influenceurs.length = 0;

        const influSortArray = Object.entries(influencers.influencers).map(([name, { messages, comments }]) => [name, messages, comments]);

        influSortArray.sort(([, aMessages], [, bMessages]) => bMessages - aMessages);

        influSortArray.length = 3;

        glob.arrayOfTwits.influenceurs = influSortArray.slice();

        insertBadgeInflu();
      }
      else {
        // todo : add error card in dom
        glob.arrayOfTwits.influenceurs.length = 0;
      }
    }
    )
    .catch((error) => console.error('error in getInfluencers() : ', error));
}
