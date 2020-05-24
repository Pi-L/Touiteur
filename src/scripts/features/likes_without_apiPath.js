import * as glob from './global.js';
// Most liked twits
// --------------------------------------------------------------
const mostLikedContainer = document.querySelector('.tt-mostLiked');
const mostLikedId = [];

export function setMostLiked(id) {
  const el = glob.arrayOfTwits.twits.find((twit) => twit.id === id);
  el.insertInDom(mostLikedContainer);
  // mostLikedContainer.appendChild(el.cloneNode(true));
}

export function getMostLiked() {
  fetch(`<api>/likes/top?count=2`)
    .then((response) => {
      return response.json();
    })
    .then((mostLiked) => {
      if (mostLiked.top.length > 0) {
        mostLikedContainer.textContent = '';
        mostLikedId.length = 0;

        Object.values(mostLiked.top).map((twit) => mostLikedId.push(twit.id))

        mostLikedId.map((id) => setMostLiked(id));
      }
      else {
        //   todo: error card - idem for onrejected
      }
    }
    )
    .catch((error) => console.error('error in getMostLikedTwits() : ', error));
}

// Liking twits
// --------------------------------------------------------------

export function likeATwit(id) {
  fetch('<api>/likes/send',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `message_id=${id}`
    })
    .catch((err) => console.error('erreur de like : ', err));
}

export function unLikeATwit(id) {
  fetch('<api>/likes/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `message_id=${id}`
  })
    .catch((err) => console.error('erreur unLikeATwit() : ', err));
}

export function likeable(touit) {
  if (touit.isLiked) {
    touit.isLiked = false;
    touit.twitHeartsCount.textContent = (parseInt(touit.twitHeartsCount.textContent, 10) - 1).toString();
    touit.twitHearts.classList.remove('voted');
    unLikeATwit(touit.id);

  }
  else {
    touit.isLiked = true;
    touit.twitHeartsCount.textContent = (parseInt(touit.twitHeartsCount.textContent, 10) + 1).toString();
    touit.twitHearts.classList.add('voted');
    likeATwit(touit.id);
  }
}
