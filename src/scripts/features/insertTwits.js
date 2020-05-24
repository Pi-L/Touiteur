/* eslint-disable import/prefer-default-export */
import * as glob from './global.js';

export function insertTwits(qty = 20) {
    const index = glob.arrayOfTwits.currentVisibleIndex;

    if (index < glob.arrayOfTwits.twits.length - 1) {

        const maxIndex = (index + qty) > glob.arrayOfTwits.twits.length ? glob.arrayOfTwits.twits.length - 1 : (index + qty);

        for (let i = index + 1; i < maxIndex + 1; i++) {

            glob.arrayOfTwits.twits[i].insertInDom(glob.twitSection);
        }
        glob.arrayOfTwits.currentVisibleIndex = maxIndex;
    }
}