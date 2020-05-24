import * as comment from '../features/comments.js';
import * as like from '../features/likes.js';
import * as glob from '../features/global.js';
import * as inserT from '../features/insertTwits.js';

export const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
}

export class Touit {
    constructor(pseudo, message, likes = 0, id, nbComments = 0, date) {
        this.pseudo = pseudo;
        this.message = message;
        this.likes = likes;
        this.id = id;
        this.nbComments = nbComments;
        this.date = date;
        this.mostLiked = 0;
        this.isLiked = false;

        this.entry = null;
    }

    creatDomEl() {
        this.twitArticle = document.createElement('article');
        this.twitArticle.classList.add('tt-archiveTwit__article');

        // pseudo
        const twitPseudo = document.createElement('p');
        this.twitArticle.appendChild(twitPseudo).textContent = this.pseudo;
        twitPseudo.classList.add('tt-archiveTwit__article__pseudo');

        // message
        const twitMessage = document.createElement('p');
        this.twitArticle.appendChild(twitMessage).textContent = this.message;
        twitMessage.classList.add('tt-archiveTwit__article__message');

        // likes
        this.twitHearts = document.createElement('button');
        this.twitHeartsCount = document.createElement('p');
        this.twitArticle.appendChild(this.twitHearts).textContent = '❤';
        this.twitHearts.appendChild(this.twitHeartsCount).textContent = this.likes;
        this.twitHearts.classList.add('tt-archiveTwit__article__hearts');
        this.twitHeartsCount.classList.add('tt-archiveTwit__article__heartsCount');

        // comments 
        this.commentButton = document.createElement('button');
        this.commentButton.id = 'tt-archiveTwit__article__comments';
        const commentButtonImage = document.createElement('img');
        commentButtonImage.src = 'img/commentTwit.svg';
        commentButtonImage.alt = 'See this twit comments';
        this.commentsCount = document.createElement('p');
        this.commentsCount.className = 'tt-archiveTwit__article__commentsCount';
        this.twitArticle.appendChild(this.commentButton);
        this.commentButton.appendChild(commentButtonImage);
        this.commentButton.appendChild(this.commentsCount).textContent = this.nbComments;

        // time stamp to date
        const postTimeEl = document.createElement('p');
        this.twitArticle.appendChild(postTimeEl).textContent = this.date;
        postTimeEl.classList.add('tt-postTime', 'tt-archiveTwit__article__date');

        // badge el
        this.badgeEl = document.createElement('img');
        this.badgeEl.classList.add('tt-archiveTwit__article__badge');
    }

    insertBadge() {
        this.badgeEl.src = 'img/influencers.svg';
        this.badgeEl.alt = 'Badge of merite';
        this.twitArticle.appendChild(this.badgeEl);
    }

    removeBadge() {
        if (this.badgeEl !== undefined) {
            this.badgeEl.remove();
        }
    }

    insertInDom(container, position = 'after') {
        if (position === 'after') {
            container.appendChild(this.twitArticle);
        }
        else {
            container.insertAdjacentElement('afterbegin', this.twitArticle);
        }

        this.twitHearts.addEventListener('click', () => {
            like.likeable(this);
        });
        this.commentButton.addEventListener('click', () => {
            comment.toggleCommentsVisibility();
            comment.getComments(this.id);
        });

        const observer = new IntersectionObserver(((entries) => this.refreshPost(entries)), options);

        observer.observe(this.twitArticle);
    }

    refreshPost(entries) {
        [this.entry] = entries;

        if (this.entry.isIntersecting && glob.arrayOfTwits.twits.indexOf(this) === glob.arrayOfTwits.currentVisibleIndex) {
            inserT.insertTwits();
        }
    }
}
// ----- end touit object

