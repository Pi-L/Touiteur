export const arrayOfTwits = {
    twits: [],
    influenceurs: [],
    ts: 0,
    currentVisibleIndex: -1
};

export const twitSection = document.querySelector('.tt-archiveTwit__container');

export function insertErrorCard(container, title = 'Network error', message = '') {

    const errorArticle = document.createElement('article');
    const errorTitle = document.createElement('h2');
    const errorMessage = document.createElement('p');

    errorArticle.appendChild(errorTitle).textContent = title;
    errorArticle.appendChild(errorMessage).textContent = message;

    errorArticle.classList.add('tt-errorArticle');

    container.insertAdjacentElement('afterbegin', errorArticle);
}

