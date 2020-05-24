/* eslint-disable import/prefer-default-export */
// Inputing New Twits
// --------------------------------------------------------------
// import * as glob from './global.js';
import * as util from './utilities.js';
import * as getTwit from './getTwits.js';

const pseudoNewTwit = document.querySelector('#tt-newTwit__pseudo');
const messageNewTwit = document.querySelector('#tt-newTwit__message');
const pseudoNewTwitLabel = document.querySelector('#tt-newTwit__pseudo + label');
const messageNewTwitLabel = document.querySelector('#tt-newTwit__message + label');

export const formNewTwit = document.querySelector('.tt-newTwit__form');


// const buttonSendNew = document.querySelector('#tt-newTwit__submit');

// buttonSendNew.addEventListener('click', addNewTwit);


export function addNewTwit(e) {
  e.preventDefault();
  if (util.validateInput(pseudoNewTwit, pseudoNewTwitLabel, messageNewTwit, messageNewTwitLabel)) {

    fetch('<api>/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `name=${encodeURIComponent(pseudoNewTwit.value)}&message=${encodeURIComponent(messageNewTwit.value)}`
    })
      .then((res) => res.text())
      .then((data) => {
        if (JSON.parse(data).success) {
          getTwit.getTwitsFromAPI();
          pseudoNewTwit.value = '';
          messageNewTwit.value = '';
        }
      })
      .catch((err) => console.error('erreur addNewTwit() : ', err));
  }
}
