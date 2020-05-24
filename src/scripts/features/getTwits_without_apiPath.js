/* eslint-disable import/prefer-default-export */
import * as glob from './global.js';
import * as util from './utilities.js';
import * as tt from '../classes/touit.js';
import * as inserT from './insertTwits.js';
import * as influ from './influencers.js';

export function getTwitsFromAPI() {
  fetch(`<api>/list?ts=${glob.arrayOfTwits.ts}`)
    .then((response) => response.json())
    .then((twits) => {

      if (twits.messages.length > 0) {

        const lesTwits = twits.messages;

        lesTwits.map((twit) => {
          const oldTwit = new tt.Touit(twit.name, twit.message, twit.likes, twit.id, twit.comments_count, util.timeConverter(twit.ts));

          oldTwit.creatDomEl();

          glob.arrayOfTwits.twits.unshift(oldTwit);

          if (glob.arrayOfTwits.ts > 0) oldTwit.insertInDom(glob.twitSection, 'before');
        });

        if (glob.arrayOfTwits.ts > 0) {
          glob.arrayOfTwits.currentVisibleIndex += lesTwits.length;
        } else {
          inserT.insertTwits();
        }

        glob.arrayOfTwits.ts = lesTwits[lesTwits.length - 1].ts;

        influ.getInfluencers();
      }
    })
    .catch((error) => console.error('erreur getTwitsFromAPI() : ', error));
  // todo : add error card in dom
}

