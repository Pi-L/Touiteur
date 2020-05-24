/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as glob from './features/global.js';
import * as getTwit from './features/getTwits.js';
import * as newT from './features/newTwits.js';
import * as comment from './features/comments.js';
import * as like from './features/likes.js';
import * as trend from './features/trending.js';
import * as influ from './features/influencers.js';

// Containers
// --------------------------------------------------------------
const sectionMostOf = document.querySelector('.tt-mostOf');
const sectionNewTwit = document.querySelector('.tt-newTwit__container');

// Navigation
// --------------------------------------------------------------
const buttonNewTwit = document.querySelector('#newTouit');
const buttonTrendingTwits = document.querySelector('#trendingTwits');
const buttonMostLikedTwits = document.querySelector('#mostLikedTwits');
const buttonInfluencers = document.querySelector('#influencers');

// Events
// --------------------------------------------------------------

buttonNewTwit.addEventListener('click', () => {
  sectionMostOf.classList.remove('shownInflu', 'shownLiked', 'shownTrend');
  sectionNewTwit.classList.toggle('shown');
});

buttonTrendingTwits.addEventListener('click', () => {
  trend.getTrending();
  sectionNewTwit.classList.remove('shown');
  sectionMostOf.classList.remove('shownInflu', 'shownLiked');
  sectionMostOf.classList.toggle('shownTrend');
});

buttonMostLikedTwits.addEventListener('click', () => {
  like.getMostLiked();
  sectionNewTwit.classList.remove('shown');
  sectionMostOf.classList.remove('shownInflu', 'shownTrend');
  sectionMostOf.classList.toggle('shownLiked');
});

buttonInfluencers.addEventListener('click', () => {
  influ.setInfluencers();

  sectionNewTwit.classList.remove('shown');
  sectionMostOf.classList.remove('shownLiked', 'shownTrend');
  sectionMostOf.classList.toggle('shownInflu');
});

comment.modalCommentClose.addEventListener('click', comment.toggleCommentsVisibility);

comment.modalCommentSubmit.addEventListener('click', (e) => {
  comment.setComment(e, comment.currentIdComment);
}
);

newT.formNewTwit.addEventListener('submit', newT.addNewTwit);

// click on full screen transparent div to close the comment modal
comment.outsideClickCloser.addEventListener('click', comment.toggleCommentsVisibility);


function refreshVisiblePosts() {
  glob.arrayOfTwits.twits.map((twit) => {
    if (twit.entry && twit.entry.intersectionRatio > .8) {
      fetch(`<api>/get?id=${twit.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (Object.keys(data.data).length > 0) {

            twit.likes = data.data.likes;
            twit.nbComments = data.data.comments_count;
            twit.commentsCount.textContent = twit.nbComments;
            twit.twitHeartsCount.textContent = twit.likes;
          }
        })
        .catch((error) => console.error('erreur refreshPost() : ', error));
    }
  });
}

getTwit.getTwitsFromAPI();


const intervals = {
  newTwitsRefreshD: 10000,
  visibleTwitsRefreshD: 4000
}

if (!document.hidden) {
  intervals.newTwits = setInterval(getTwit.getTwitsFromAPI, intervals.newTwitsRefreshD);
  intervals.visibleTwits = setInterval(refreshVisiblePosts, intervals.visibleTwitsRefreshD);
} else {
  intervals.newTwits = null;
  intervals.visibleTwits = null;
};

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(intervals.newTwits);
    clearInterval(intervals.visibleTwits);

  } else {
    intervals.newTwits = setInterval(getTwit.getTwitsFromAPI, intervals.newTwitsRefreshD);
    intervals.visibleTwits = setInterval(refreshVisiblePosts, intervals.visibleTwitsRefreshD);

  }
});
