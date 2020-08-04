/*
 * webgetservice/index.js
 *
 * @flow
 */

import getEventFundraisingTotals from './getEventFundraisingTotals';
import getParticipantScoreBoard from './getParticipantScoreBoard';
import getRegistrant from './getRegistrant';
import getTeamScoreBoard from './getTeamScoreBoard';
import mobileParticipant from './mobileParticipant';
import postMessageBoardMain from './postMessageBoardMain';
import teamByTeamID from './teamByTeamID';
import teamSearchReg from './teamSearchReg';
import type { Config } from '../config';

export { getEventFundraisingTotals };
export { getParticipantScoreBoard };
export { getRegistrant };
export { getTeamScoreBoard };
export { mobileParticipant };
export { postMessageBoardMain };
export { teamByTeamID };
export { teamSearchReg };

export function bind(config: Config): * {
  const { baseURL } = config;
  if (baseURL.match(/get[.]asmx\/?$/)) {
    throw new Error('Do not postfix baseURL with get.asmx');
  }

  if (baseURL.match(/mobile[.]asmx\/?$/)) {
    throw new Error('Do not postfix baseURL with mobile.asmx');
  }

  return {
    getEventFundraisingTotals: (...args: *) =>
      getEventFundraisingTotals(config, ...args),
    getParticipantScoreBoard: (...args: *) =>
      getParticipantScoreBoard(config, ...args),
    getRegistrant: (...args: *) => getRegistrant(config, ...args),
    getTeamScoreBoard: (...args: *) => getTeamScoreBoard(config, ...args),
    mobileParticipant: (...args: *) => mobileParticipant(config, ...args),
    postMessageBoardMain: (...args: *) => postMessageBoardMain(config, ...args),
    teamByTeamID: (...args: *) => teamByTeamID(config, ...args),
    teamSearchReg: (...args: *) => teamSearchReg(config, ...args),
  };
}

export const bindWithBaseURL = bind;
