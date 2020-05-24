import * as glob from './global.js';
import * as util from './utilities.js';


export const modalCommentClose = document.querySelector('#tt-comment__close');
export const modalCommentSubmit = document.querySelector('#tt-comment__submit');
export const outsideClickCloser = document.querySelector('.tt-transparentBg_closer');
export let currentIdComment = null;

const modalComment = document.querySelector('aside.tt-comment__container');

const modalCommentArchive = document.querySelector('.tt-comment__archives');
const modalCommentPseudo = document.querySelector('#tt-comment__pseudo');
const modalCommentMessage = document.querySelector('#tt-comment__message');
const modalCommentPseudoLabel = document.querySelector('#tt-comment__pseudo + label');
const modalCommentMessageLabel = document.querySelector('#tt-comment__message + label');


export function toggleCommentsVisibility() {
  modalCommentPseudo.value = '';
  modalCommentMessage.value = '';
  modalComment.classList.toggle('shown');
  outsideClickCloser.classList.toggle('shown');
  document.body.classList.toggle('commenting');
}

// todo : block body scroll with body overflow hidden ? work on mobile ?
export function addCommentToDom(comment) {
  if (modalCommentArchive.firstChild && modalCommentArchive.firstChild.lastChild.textContent === '') {
    modalCommentArchive.firstChild.remove();
  }

  // A comment container
  const commentLi = document.createElement('li');
  modalCommentArchive.prepend(commentLi);
  commentLi.classList.add('tt-comment__list');

  // A comment message
  const commentMessage = document.createElement('p');
  commentLi.appendChild(commentMessage).textContent = comment.comment;
  commentMessage.classList.add('tt-comment__message');

  // A comment pseudo
  const commentPseudo = document.createElement('p');
  commentLi.appendChild(commentPseudo).textContent = comment.name;
  commentPseudo.classList.add('tt-comment__pseudo');

  // A comment ts
  if (comment.ts) {
    const commentTS = document.createElement('p');
    commentLi.appendChild(commentTS).textContent = util.timeConverter(comment.ts);
    commentTS.classList.add('tt-comment__ts', 'tt-postTime');
  }
}

export function getComments(id) {

  // message if no comment
  const noComment = {
    comment: 'No Comment',
    name: '',
    ts: null
  };
  currentIdComment = id;
  modalCommentArchive.textContent = '';

  fetch(`<api>/comments/list?message_id=${id}`)
    .then((response) => {
      return response.json();
    })
    .then((comments) => {
      const theComments = comments.comments;
      if (theComments.length > 0) {
        theComments.map((comment) => addCommentToDom(comment));
      }
      else {
        addCommentToDom(noComment);
      }
    }
    )
    .catch((error) => console.error('error in getComments() : ', error));

}

export function setComment(e, id) {
  e.preventDefault();
  if (util.validateInput(modalCommentPseudo, modalCommentPseudoLabel, modalCommentMessage, modalCommentMessageLabel)) {

    fetch(`<api>/comments/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      ,
      body: `name=${encodeURIComponent(modalCommentPseudo.value)}&comment=${encodeURIComponent(modalCommentMessage.value)}&message_id=${id}`
    })
      .then(() => {
        const myComment = {
          comment: `${modalCommentMessage.value}`,
          name: `${modalCommentPseudo.value}`
        };
        addCommentToDom(myComment);
        modalCommentPseudo.value = '';
        modalCommentMessage.value = '';

        const objectOfTheComment = glob.arrayOfTwits.twits.find((twit) => twit.id === id);
        objectOfTheComment.nbComments++;
        objectOfTheComment.commentsCount.textContent = objectOfTheComment.nbComments;
      })
      .catch((err) => console.error('erreur setComment() : ', err));
  }
}

